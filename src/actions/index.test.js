import {setError} from '.';

describe('actions', function() {
  it('creates error action', function() {
    expect(setError('whatever')).toEqual({type: 'SET_ERROR', error: 'whatever'});
  });
});
