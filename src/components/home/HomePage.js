import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
	<div className='jumbotron'>
		<div className='container'>
			Dash Board Admin
			<p>React and Redux app</p>
			<Link to='about' className='btn btn-primary btn-lg'>
				Learn more
			</Link>
		</div>
	</div>
);

export default HomePage;
