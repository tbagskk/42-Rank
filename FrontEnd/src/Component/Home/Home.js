import './Home.css';
import './Home_Responsive.css';
import Right from '../Right/Right.js';
import Leaderboard from '../Leaderboard/Leaderboard.js';
import PageButtons from '../PageButtons/PageButtons.js';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Home({students, setStudents}) {
    let [nbPages, setNbPages] = useState(0);
    let [page, setPage] = useState(1);

    let getUsersFromPage = async() => {
        let response = await axios.get("/api/getUsers", {
            params: {
                campus_id: Cookies.get("current_campus_id"),
                cursus_id: Cookies.get("current_cursus_id"),
                page: page
            }
        })
        setStudents(response.data.students);
        setNbPages(Math.ceil(response.data.totalCount / 50));
    }
    
    useEffect(() => {
        getUsersFromPage();
    }, [page]);
    
    let previousPage = async () => {
        if (page > 1)
        {
            setStudents([]);
            setPage(page - 1);
        }
    }
    
    let nextPage = async () => {
        if (page < nbPages)
        {
            setStudents([]);
            setPage(page + 1);
        }
    }

    return (
        <div id="Home">
            <div id="container_home_content">
            <div id="home_content">
                <Leaderboard students={students}/>
                <Right
                    setStudents={setStudents}
                    page={page}
                    setNbPages={setNbPages}
                    setPage={setPage}/>
            </div>
            <div id="home_page_buttons">
                <button onClick={() => previousPage()} id="button_arrow"> &lt;</button>
                <PageButtons page={page} nbPages={nbPages} setPage={setPage} setStudents={setStudents}/>
                <button onClick={() => nextPage()} id="button_arrow"> &gt;  </button>
            </div>
            </div>
           
        </div>

    );
}
