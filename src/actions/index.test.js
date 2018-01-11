import {showEntry} from '.';

describe('actions', function() {
  it('creates show entry action', function() {
    expect(showEntry('whatever')).toEqual({type: 'SHOW_ENTRY', entry: 'whatever'});
  });
});
