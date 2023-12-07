import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie"

import App from '../App.js';
import Login from '../Component/Login/Login.js';


export default function AppRoutes(){

    let [errored, setErrored] = useState(false);
    let [loading, setLoading] = useState(false);
    let [students, setStudents] = useState([]);

    let code = new URLSearchParams(new URL(window.location.href).search).get("code");
    
    let getToken = async () => {
        setLoading(true);
        try {
            let response = await axios.post('/api/getToken', { code: code });
            Cookies.set("id", response.data.student.id, { expires: 1 / 48 })
            Cookies.set("campus_id", response.data.student.campus[0].id, { expires: 1 / 48});
            Cookies.set("current_campus_id", Cookies.get("campus_id"), { expires: 1 / 48});
            Cookies.set("campus_name", response.data.student.campus[0].name, { expires: 1 / 48});
            Cookies.set("cursus_id", response.data.student.cursus_users[response.data.student.cursus_users.length - 1].cursus_id, { expires: 1 / 48});
            Cookies.set("current_cursus_id", Cookies.get("cursus_id"));
            Cookies.set("first_name", response.data.student.first_name, { expires: 1 / 48 })
            Cookies.set("last_name", response.data.student.last_name, { expires: 1 / 48 })
            Cookies.set("login", response.data.student.login, { expires: 1 / 48 })
            Cookies.set("image", response.data.student.image?.versions?.medium, { expires: 1 / 48 })
            setStudents(response.data.students);
            setErrored(false);
        } catch(e) {
            console.log(e)
            setErrored(true);
            // setLoading(false);
        }
    }

    useEffect(() => {
        if (code && !Cookies.get("id"))
            getToken();
    });

    if (Cookies.get("id"))
        return (
            <Routes>
                <Route path="/" element={<App students={students} setStudents={setStudents}/>}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        )
    else
        return (
            <Login error={errored} loading={loading}/>
        )
}