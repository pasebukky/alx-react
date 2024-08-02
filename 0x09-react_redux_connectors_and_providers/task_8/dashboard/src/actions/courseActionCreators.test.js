import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCourses, setCourses } from './courseActionCreators';
import { FETCH_COURSE_SUCCESS } from './courseActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchCourses action creator', () => {
  it('creates FETCH_COURSE_SUCCESS when fetching courses has been done', async () => {
    const store = mockStore({ courses: [] });
    const mockCourses = [
      { id: '1', name: 'Course 1', credit: 30 },
      { id: '2', name: 'Course 2', credit: 40 },
    ];

    // Mock the fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCourses),
      })
    );

    const expectedActions = [
      { type: FETCH_COURSE_SUCCESS, payload: mockCourses },
    ];

    await store.dispatch(fetchCourses());
    expect(store.getActions()).toEqual(expectedActions);

    // Clean up the global fetch mock
    global.fetch.mockRestore();
  });
});
