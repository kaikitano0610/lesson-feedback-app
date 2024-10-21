import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(){
    return(
        <div>
            <h1>NavBar</h1>
            <NavLink to="/about" activeClassName="active">About</NavLink>
            <NavLink to="/home" activeClassName="active">Home</NavLink>
        </div>
    );
}

export default NavBar;
