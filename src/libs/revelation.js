import { ModeOfOperation as AES } from 'aes-es';
import { memMove } from 'aes-es/src/buffer';
import pako from 'pako';
import { UTF8Decode } from './utf8';

function passwordBlock(password) {
  var buf = new ArrayBuffer(32);
  var view = new DataView(buf);
  for (let i = 0; i < password.length && i < 32; ++i) {
    view.setUint8(i, password.charCodeAt(i));
  }
  return view;
}

function decrypt(file, password) {
  password = passwordBlock(password);

  var ivView = new DataView(file, 12, 16);
  var iv = (new AES.ecb(password)).decrypt(ivView);

  var decryptor = new AES.cbc(password, iv);
  var result = new ArrayBuffer(file.byteLength - 28);
  var resultView = new DataView(result);
  var blocks = (file.byteLength - 28) / 16;
  for (let i = 0; i < blocks; ++i) {
    var blockView = new DataView(file, 28 + i * 16, 16);
    var block = decryptor.decrypt(blockView);
    memMove(block, 0, 16, resultView, i * 16);
  }

  const padlen = resultView.getUint8(resultView.byteLength - 1);
  if (padlen < 1 || padlen > 16)
    throw new Error('Bad padlen ' + padlen + '.');

  for (var i = resultView.byteLength - padlen; i < resultView.byteLength; ++i)
    if (resultView.getUint8(i) !== padlen)
      throw new Error("padding is corrupted");

  resultView = new Uint8Array(result, 0, result.byteLength - padlen);
  result = pako.inflate(resultView);

  return result;
}

function parseXML(content) {
  const parseEntry = function(tree) {
    let entry = {
      type: tree.getAttribute('type')
    };
    for (let i = 0; i < tree.childNodes.length; ++i) {
      const child = tree.childNodes.item(i);
      if (child.localName === 'name') {
        entry.name = child.textContent;
      } else if (child.localName === 'description') {
        entry.description = child.textContent;
      } else if (child.localName === 'field') {
        const id = child.getAttribute('id');
        entry[id] = child.textContent;
      }
    }

    entry.children = parseChildren(tree);

    return entry;
  };

  const parseChildren = function(tree) {
    let result = [];
    for (let i = 0; i < tree.childNodes.length; ++i) {
      let node = tree.childNodes.item(i);
      if (node.localName === 'entry')
        result.push( parseEntry(node) );
    }
    return result;
  };

  var parser = new DOMParser();
  var doc = parser.parseFromString(content, 'text/xml');

  if (doc.documentElement.localName === 'revelationdata')
    return parseChildren(doc.documentElement);
  else
    return null;
}

function read(file, password) {
  const xmlBuffer = decrypt(file, password);
  const xml = UTF8Decode(xmlBuffer);
  const entries = parseXML(xml);
  return entries;
}

export default {
  read
};

