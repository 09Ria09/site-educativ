import React, {useEffect, useRef, useState} from "react";
import {NavLink, useLocation} from 'react-router-dom';
import '../css/Navbar.css';
import axios from "axios";
import Cookies from "universal-cookie";

function Navbar(props) {

    const cookies = new Cookies();
    const [scrolled, changeScrolled] = useState(false);
    const navbar = useRef();
    const location = useLocation();

    useEffect(() => {
        if (['/'].indexOf(location.pathname) === -1) {
            changeScrolled(true);
            return;
        } else changeScrolled(false);
        const onScroll = () => {
            if (window.pageYOffset > window.innerHeight * (1 / 3))
                changeScrolled(true);
            else changeScrolled(false);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [location]);

    return (
        <div ref={navbar} className={'navbar' + (scrolled === true ? ' navbarOpaque' : '')}>
            <NavLink to={'/'} isActive={(match, location) => {
                if (!location) return false;
                const {pathname} = location;
                return pathname === "/";
            }} className={'navbarObject'} activeClassName={scrolled === true ? 'navbarActive' : ''}>
                <img className={'logo'} src={'logo.png'} alt={'logo'}/></NavLink>
            <div className={'navbarSpacer'}/>
            {props.signedIn === false ?
                (
                    <React.Fragment>
                        <NavLink to={'/signIn'} className={'navbarObject'}
                                 activeClassName={scrolled === true ? 'navbarActive' : ''}>Sign In</NavLink>
                        <NavLink to={'/signUp'} className={'navbarObject'}
                                 activeClassName={scrolled === true ? 'navbarActive' : ''}>Sign Up</NavLink>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavLink to={'/notification'} className={'navbarObject'}
                                 activeClassName={scrolled === true ? 'navbarActive' : ''}>Notifications</NavLink>
                        <NavLink to={'/discover'} className={'navbarObject'}
                                 activeClassName={scrolled === true ? 'navbarActive' : ''}>Discover</NavLink>
                        <NavLink to={'/profile'} className={'navbarObject'}
                                 activeClassName={scrolled === true ? 'navbarActive' : ''}>Profile</NavLink>
                        <a onClick={() => {
                            axios({
                                method: 'post',
                                url: '/SignOut'
                            }).then(res => {
                                if (JSON.parse(res.request.response).signedOut === true) {
                                    props.setSignedIn(false);
                                    cookies.remove('signed-in', {sameSite: true});
                                }
                            })
                        }} className={'navbarObject'}>Sign Out</a>
                    </React.Fragment>
                )}
        </div>
    );
}

export default Navbar;