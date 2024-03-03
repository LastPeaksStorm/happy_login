import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import LoginContext from '../contexts/LoginContext';

function Profil() {
    const { username } = useContext(LoginContext);
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        let loggedUser = localStorage.getItem('username');
        if(!loggedUser){
            window.location.replace("http://localhost:3000/login");
        }
        else {
            setAuth(true);
        }
    }, []);

    return (
        <div>
            <Navbar />
            { auth
            ? <h1>Hallo, {username}!</h1>
            : <h1>Loading...</h1>
            }
        </div>
    );
}

export default Profil;