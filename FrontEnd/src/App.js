import './App.css';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';

import Home from './Component/Home/Home.js';
import Header from './Component/Header/Header.js';

export default function App({students, setStudents}) {

	return (
		<>
			<Header />
			<Home students={students} setStudents={setStudents}/>
			<Analytics />
		</>
	);
}
