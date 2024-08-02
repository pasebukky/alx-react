import rootReducer from './rootReducer';
import { Map } from 'immutable';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      courses: Map(),
      notifications: Map(),
      ui: Map(),
    };

    const state = rootReducer(undefined, {});
    expect(state.toJS()).toEqual(initialState);
  });
});
