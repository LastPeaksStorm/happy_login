import React from "react";
import { Link } from 'react-router-dom';
import cl from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={cl.navbar}>
          <div>
            <Link className={cl.navbar__link} to='/profile'>Profil</Link>
            <Link className={cl.navbar__link} to='/register'>Registrieren</Link>
            <Link className={cl.navbar__link} to='/login'>Anmelden</Link>
          </div>
        </div>
    )
}

export default Navbar;
