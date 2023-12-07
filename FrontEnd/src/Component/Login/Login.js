import React from 'react';
import './Login.css';
import logo from "../../assets/logo.png"

export default function Login({error, loading}) {
    let login_url = "https://api.intra.42.fr/oauth/authorize?" +
                    "client_id=u-s4t2ud-d38eb8e0bbf331519fc42f6d94c99aab22d3e3ff1f128c30db39629fd8880ef3" +
                    "&redirect_uri=https%3A%2F%2Fwww.42rank.xyz" +
                    // "&redirect_uri=http%3A%2F%2Flocalhost%3A3000" +
                    "&response_type=code"
    if (loading)
        return (
            <div className="login_container">
                <img className="login_logo" src={logo} alt="logo"></img>
                <div className="login_title">
                    <h1>User loading...</h1>     
                </div>
                <div className="loader_container">
                        <div className="loader"></div>
                </div>
            </div>
        )
    else
        return (
            <div className="login_container">
                <img className="login_logo" src={logo} alt="logo"></img>
                <div className="login_title"> 
                    <h1>Log in with 42</h1>
                </div>
                <a className="login_button" href={login_url} > 
                    Log in
                </a>
                
                {error ? 
                    <p className="login_error">Une erreur est survenue, merci de réessayer</p> :
                    <></>
                }
            </div>
        );
}

