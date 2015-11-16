import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app';
import { content } from './store';

let store = createStore(content);
ReactDOM.render(
  React.createElement(Provider, {store: store},
                      React.createElement(App)),
  document.getElementById('app'));


import { ModeOfOperation as AES } from 'aes-es';
import { memMove } from 'aes-es/src/buffer';
import pako from 'pako';

function passwordBlock(password) {
  var buf = new ArrayBuffer(32);
  var view = new DataView(buf);
  for (let i = 0; i < password.length && i < 32; ++i) {
    view.setUint8(i, password.charCodeAt(i));
  }
  return view;
}

function ab2str(v) {
//  return (new Uint8Array(v.buffer, v.byteOffset, v.byteLength)).map(f => f);
  return String.fromCharCode.apply(null, new Uint8Array(v));
}

function fileOpened(file) {
  var password = passwordBlock('*************************');

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

  //      (when (find padlen buffer :start (- size padlen) :test '/=)
  //         (error "padding is corrupted"))

  resultView = new Uint8Array(result, 0, result.byteLength - padlen);
  result = pako.inflate(resultView);

    console.log(ab2str(result));
}

document.querySelector('input[type=file]').onchange = function(event) {
  let f = event.target.files[0];
  if (f) {
    let r = new FileReader();
    r.onloadend = (event) => {
      fileOpened(event.target.result);
    };
    r.readAsArrayBuffer(f);
  }
};

