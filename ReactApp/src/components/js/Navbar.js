import React, {useEffect, useRef, useState} from "react";
import {NavLink, useLocation} from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {

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
            <NavLink to={'/discover'} className={'navbarObject'}
                     activeClassName={scrolled === true ? 'navbarActive' : ''}>Discover</NavLink>
            <NavLink to={'/signIn'} className={'navbarObject'}
                     activeClassName={scrolled === true ? 'navbarActive' : ''}>Sign In</NavLink>
            <NavLink to={'/signUp'} className={'navbarObject'}
                     activeClassName={scrolled === true ? 'navbarActive' : ''}>Sign Up</NavLink>
        </div>
    );
}

export default Navbar;