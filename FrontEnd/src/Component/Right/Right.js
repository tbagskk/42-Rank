// import React, { useEffect, useState } from 'react';
import './Right.css';
import './Right_Responsive.css';
import Dropdown from '../Dropdown/Dropdown.js';
import Cookies from "js-cookie"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Right({setStudents, page, setNbPages, setPage}) {

    const login = Cookies.get("login");
    const firstname = Cookies.get("first_name");
    const lastname = Cookies.get("last_name");
    const image = Cookies.get("image");
    
    const [campus_list, set_campus_list] = useState([]);

    let searchUser = (event) => {
        // if (event.target.value === "")
        //     setStudents([]);
        // else
        //     setUsers(students.filter(user => 
        //         (user.login.includes(event.target.value.toLowerCase())
        //         || user.first_name.toLowerCase().includes(event.target.value.toLowerCase())
        //         || user.last_name.toLowerCase().includes(event.target.value.toLowerCase()))
        //     ));
    }

    let update_campus = async (campus_id) => {
        setStudents([]);
        setNbPages(0);
        setPage(1);
        let response = await axios.get("/api/getUsers", {
            params: {
                campus_id: campus_id,
                cursus_id: Cookies.get("current_cursus_id"),
                page: 1 
            }
        });
        Cookies.set("current_campus_id", campus_id, { expires: 1 / 48 });
        setStudents(response.data.students);
        setNbPages(Math.ceil(response.data.totalCount / 50));
    }

    let update_cursus = async (cursus_id) => {
        setStudents([]);
        setNbPages(0);
        setPage(1);
        let response = await axios.get("/api/getUsers", {
            params: {
                campus_id: Cookies.get("current_campus_id"),
                cursus_id: cursus_id,
                page: 1
            }
        });
        Cookies.set("current_cursus_id", cursus_id, { expires: 1/ 48 });
        setStudents(response.data.students);
        setNbPages(Math.ceil(response.data.totalCount / 50));
    }

    let get_campus_list = async () => {
        let response = await axios.get("/api/getCampus");
        set_campus_list(response.data.campus_list.sort((a,b) => a.name.localeCompare(b.name)));

    }

    useEffect(() => {
        get_campus_list();
    }, [])

    return (
        <div className="container_right">
            <div id="info_right" className="bar">
                <a href={"https://profile.intra.42.fr/users/" + login} target="_blank" rel="noopener noreferrer">
                    <img className="profil_img" src={image} alt="img_profil"/>
                </a>
                <div className="profil_names">
                    <p className="p_profil">{firstname} {lastname}</p>
                    <p className="p_profil_grey">{login}</p>
                </div>
            </div>
            {/* <input id="search_right" className="bar" placeholder="Search for user..." onChange={searchUser}/> */}
            <Dropdown key="1" 
                drop_function={update_campus}
                values={[
                    { placeholder: "All", drop_value: 0, current: parseInt(Cookies.get("current_campus_id")) === 0 },
                    ...campus_list.map(campus => {
                        return ({ placeholder: campus.name, drop_value: campus.id, current: parseInt(Cookies.get("current_campus_id")) === campus.id })
                    })
                ]}
                />
            <Dropdown key="2"
                drop_function={update_cursus}
                values={[
                    { placeholder: "Piscine", drop_value: 9, current: parseInt(Cookies.get("current_cursus_id")) === 9 },
                    { placeholder: "42 Cursus", drop_value: 21, current: parseInt(Cookies.get("current_cursus_id")) === 21 }
                ]}/>
            {/* <Dropdown key="3" 
                placeholder="Date"
                disable={true}
                values={[{placeholder: "Août 2023", drop_value: 0}]}/> */}
        </div>
    );
}
