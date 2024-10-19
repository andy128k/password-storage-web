import { CBC, ECB } from "aes-es";
import pako from "pako";
import { generateId } from "./generate_id";
import { UTF8Decode } from "./utf8";

function makeBlock(text) {
  const buf = new Array(32);
  let i;
  for (i = 0; i < text.length && i < 32; ++i) {
    buf[i] = text.charCodeAt(i);
  }
  for (; i < 32; ++i) {
    buf[i] = 0;
  }
  return buf;
}

function decrypt(file, password) {
  const passwordBlock = makeBlock(password);

  const ivView = new Uint8Array(file, 12, 16);
  const iv = new Array(16);
  new ECB(passwordBlock).decrypt(ivView, iv);

  const decryptor = new CBC(passwordBlock, iv);
  const result = new ArrayBuffer(file.byteLength - 28);
  let resultView = new Uint8Array(result);
  const blocks = (file.byteLength - 28) / 16;
  for (let i = 0; i < blocks; ++i) {
    const blockView = new Uint8Array(file, 28 + i * 16, 16);
    const dstView = new Uint8Array(result, i * 16, 16);
    decryptor.decrypt(blockView, dstView);
  }

  const padlen = resultView[resultView.byteLength - 1];
  if (padlen < 1 || padlen > 16) {
    throw new Error(`Bad padlen ${padlen}.`);
  }

  for (let i = resultView.byteLength - padlen; i < resultView.byteLength; ++i) {
    if (resultView[i] !== padlen) {
      throw new Error("padding is corrupted");
    }
  }

  resultView = new Uint8Array(result, 0, result.byteLength - padlen);
  return pako.inflate(resultView);
}

function parseXML(content) {
  function parseEntry(tree) {
    const entry = {
      type: tree.getAttribute("type"),
      id: generateId(),
    };
    for (let i = 0; i < tree.childNodes.length; ++i) {
      const child = tree.childNodes.item(i);
      if (child.localName === "name") {
        entry.name = child.textContent;
      } else if (child.localName === "description") {
        entry.description = child.textContent;
      } else if (child.localName === "field") {
        const id = child.getAttribute("id");
        entry[id] = child.textContent;
      }
    }

    entry.children = parseChildren(tree);

    return entry;
  }

  function parseChildren(tree) {
    const result = [];
    for (let i = 0; i < tree.childNodes.length; ++i) {
      const node = tree.childNodes.item(i);
      if (node.localName === "entry") result.push(parseEntry(node));
    }
    return result;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/xml");

  if (doc.documentElement.localName === "revelationdata") {
    return parseChildren(doc.documentElement);
  } else {
    return null;
  }
}

export function readRevelationFile(file, password) {
  const xmlBuffer = decrypt(file, password);
  const xml = UTF8Decode(xmlBuffer);
  const entries = parseXML(xml);
  return entries;
}
