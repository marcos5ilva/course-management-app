import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

const CoursesPage = ({ actions, courses, authors, loading }) => {
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

	const handleDeleteCourse = async course => {
		try {
			await actions.deleteCourse(course);
		} catch (error) {
			toast.error('Delete failed. ' + error.message, { autoClose: false });
		}
		toast.success('Course deleted');
	};
	return (
		<>
			<h2>Courses</h2>
			{loading ? (
				<Spinner />
			) : (
				<CourseList courses={courses} onDeleteClick={handleDeleteCourse} />
			)}
		</>
	);
};

CoursesPage.propTypes = {
	actions: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	deleteCourse: PropTypes.func.isRequired
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
		authors: state.authors,
		loading: state.apiCallsInProgress > 0
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
			loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
			deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
