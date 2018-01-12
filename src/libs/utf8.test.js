import {UTF8Decode} from './utf8';

describe('UTF8Decode', function() {
  it('decodes empty array', function() {
    const arr = new Uint8Array([]);
    expect(UTF8Decode(arr)).toEqual('');
  });

  it('decodes ASCII bytes', function() {
    const arr = new Uint8Array([104, 101, 108, 108, 111]);
    expect(UTF8Decode(arr)).toEqual('hello');
  });

  it('decodes ASCII1 bytes', function() {
    const arr = new Uint8Array([208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130]);
    expect(UTF8Decode(arr)).toEqual('Привет');
  });
});
