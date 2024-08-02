import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

export function selectCourse(index) {
  return {
    type: SELECT_COURSE,
    index,
  };
}

export function unSelectCourse(index) {
  return {
    type: UNSELECT_COURSE,
    index,
  };
}

export function setCourses(courses) {
  return {
    type: FETCH_COURSE_SUCCESS,
    payload: courses,
  };
}

export function fetchCourses() {
  return async (dispatch) => {
    try {
      const response = await fetch('/path/to/courses.json');
      const data = await response.json();
      dispatch(setCourses(data));
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };
}
