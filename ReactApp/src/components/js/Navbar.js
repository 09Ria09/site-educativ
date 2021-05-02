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
        console.log(location.pathname.indexOf('chat'))
        if (['/', '/notifications'].indexOf(location.pathname) === -1 && location.pathname.indexOf('/chat') === -1) {
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
                        <NavLink to={'/discover'} className={'navbarObject'}
                                 activeClassName={scrolled === true ? 'navbarActive' : ''}><i style={{fontSize: '36px'}}
                                                                                              className={"ri-user-search-line"}/></NavLink>
                        <NavLink to={'/notifications'} className={'navbarObject'}
                                 activeClassName={scrolled === true ? 'navbarActive' : ''}><i style={{fontSize: '36px'}}
                                                                                              className={"ri-notification-line"}/></NavLink>
                        <NavLink to={'/profile'} className={'navbarObject'}
                                 activeClassName={scrolled === true ? 'navbarActive' : ''}><i style={{fontSize: '36px'}}
                                                                                              className={"ri-account-circle-line"}/></NavLink>
                        <button onClick={() => {
                            axios({
                                method: 'post',
                                url: '/SignOut'
                            }).then(res => {
                                if (JSON.parse(res.request.response).signedOut === true) {
                                    props.setSignedIn(false);
                                    cookies.remove('signed-in', {sameSite: true});
                                }
                            })
                        }} className={'navbarObject'}>
                            <i style={{fontSize: '36px'}} className={"ri-logout-circle-r-line"}/>
                        </button>
                    </React.Fragment>
                )}
        </div>
    );
}

export default Navbar;