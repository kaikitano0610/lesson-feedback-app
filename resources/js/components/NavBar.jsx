import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../../css/components/NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'




function NavBar(){
    return(
        <nav>
            <Link className='link'>
                <span>Lesson-Feedback-App</span>
            </Link>
            <Link className='link' to="/login">
            <FontAwesomeIcon icon={faRightToBracket} />
                ログイン
            </Link>
        </nav>
    );
}

export default NavBar;