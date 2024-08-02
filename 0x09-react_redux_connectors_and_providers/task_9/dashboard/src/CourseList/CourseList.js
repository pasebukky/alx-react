import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { getListCourses } from '../selectors/courseSelector';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  table: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2em',
    width: '90%',
    height: 'fit-content',
    border: '1px solid #ddd',
    fontSize: '1.2rem',
    marginBottom: '15em',
  },
  th: {
    borderBottom: '1px solid #ddd',
    width: '80%',
  },
  td: {
    width: '80%',
  },
  tr: {
    ':nth-child(2)': {
      textAlign: 'left',
    },
  },
});

const CourseList = ({ listCourses, fetchCourses, selectCourse, unSelectCourse }) => {
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onChangeRow = (id, checked) => {
    if (checked) {
      selectCourse(id);
    } else {
      unSelectCourse(id);
    }
  };

  return (
    <table id='CourseList' className={css(styles.table)}>
      <thead>
        <CourseListRow textFirstCell='Available courses' isHeader={true} />
        <CourseListRow
          textFirstCell='Course name'
          textSecondCell='Credit'
          isHeader={true}
        />
      </thead>
      <tbody>
        {listCourses.length > 0 ? (
          listCourses.map(({ id, name, credit, isSelected }) => (
            <CourseListRow
              key={id}
              textFirstCell={name}
              textSecondCell={credit}
              isChecked={isSelected}
              onChangeRow={(e) => onChangeRow(id, e.target.checked)}
            />
          ))
        ) : (
          <CourseListRow textFirstCell='No course available yet' />
        )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
      isSelected: PropTypes.bool.isRequired,
    })
  ),
  fetchCourses: PropTypes.func.isRequired,
  selectCourse: PropTypes.func.isRequired,
  unSelectCourse: PropTypes.func.isRequired,
};

CourseList.defaultProps = {
  listCourses: [],
};

const mapStateToProps = (state) => ({
  listCourses: getListCourses(state),
});

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
