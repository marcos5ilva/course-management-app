import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

const CoursesPage = ({ actions, courses, authors }) => {
	useEffect(() => {
		if (courses.length === 0)
			actions
				.loadCourses()
				.catch(error => alert('Loading courses failed ' + error));
		if (authors.length === 0)
			actions
				.loadAuthors()
				.catch(error => alert('Loading authors failed ' + error));
	}, []);

	return (
		<>
			<h2>Courses</h2>
			<CourseList courses={courses} />
		</>
	);
};

CoursesPage.propTypes = {
	actions: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		courses:
			state.authors.length === 0
				? []
				: state.courses.map(course => {
						return {
							...course,
							authorName: state.authors.find(
								author => author.id === course.authorId
							).name
						};
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }),
		authors: state.authors
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
			loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
