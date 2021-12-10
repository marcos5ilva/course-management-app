import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const CoursesPage = ({ actions, courses }) => {
	const [courseTitle, setCourseTitle] = useState('');

	const handleChange = e => {
		setCourseTitle(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		actions.createCourse({ ...courses, title: courseTitle });
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Courses</h2>
			<h3>Add Course</h3>
			<input type='text' onChange={handleChange} value={courseTitle} />
			<input type='submit' value='Save' />
			{courses.map(course => (
				<div key={course.tile}>{course.title}</div>
			))}
		</form>
	);
};

CoursesPage.propTypes = {
	actions: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		courses: state.courses
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
