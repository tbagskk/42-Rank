import './Profil.css';
import './Responsive/500px.css';
import './Responsive/300px.css';
import React from 'react';

export default function Profil({student}) {

    // let color_function = color(local.users.findIndex(e => e.id === student.id) + 1); //permet de récuperer la valeur de la couleur à assigner
    let link = "https://profile.intra.42.fr/users/" + student.login;

    return (
        <div className="profil_container">
            <div className="profil_div">
                <div id="rank" >{student.rank}</div>
                <div id="Profil">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <img className="profil_img" src={student.image  || "profil.png"} alt={student.login + " profil picture"} />
                    </a>
                    <div className="profil_info">
                        <div className="name">
                            <p className="p_profil">{student.first_name} {student.last_name}</p>
                        </div>
                        <div className="surname">
                            <p className="p_profil_grey">{student.login}</p>
                            <p className="p_profil">{student.level.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}