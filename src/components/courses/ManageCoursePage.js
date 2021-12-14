import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';} from '../../redux/actions/courseActions';
import {loadAuthors} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ManageCoursePage = ({ courses, authors, loadAuthors, loadCourses }) => {
	useEffect(() => {
		if (courses.length === 0)
			loadCourses().catch(error => alert('Loading courses failed ' + error));
		if (authors.length === 0)
			loadAuthors().catch(error => alert('Loading authors failed ' + error));
	}, []);
	return <h1>Manage Course Page</h1>;
};

ManageCoursePage.propTypes = {
	loadAuthors: PropTypes.func.isRequired,
	loadCourses: PropTypes.func.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		courses: state.courses,
		authors: state.authors
	};
}

const mapDispatchToProps = {
	actions: {
		loadCourses,
		loadAuthors
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
