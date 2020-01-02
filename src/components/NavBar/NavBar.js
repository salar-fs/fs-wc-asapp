import React, { useState } from 'react';
import { NavLink as LinkNav, Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import withStore from '../../hoc/withStore';
import withHistory from '../../hoc/withHistory';
import './NavBar.scss';

const NavBar = (props) => {
    const { history } = props;
    const { state, dispatch } = props.appStore;
    const { user } = state;
    let signinSignout = null;
    if (user.isAuthenticated) {
        // reset app state
        signinSignout = <NavItem>
            <NavLink
                className="signinLink"
                onClick={() => (dispatch({ type: 'USER_LOGOUT' }), history.push('/'))}>Sign out</NavLink>
        </NavItem>
    } else {
        signinSignout = <NavItem>
            <NavLink
                tag={Link}
                to="/login">Sign in</NavLink>
        </NavItem>
    }

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <>
            <Navbar color="dark" dark className="navbar">
                <NavbarBrand href="/" className="mr-auto">
                    FS WC aSaP
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                exact={true}
                                tag={LinkNav}
                                activeClassName="is-active"
                                to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                exact={true}
                                tag={LinkNav}
                                activeClassName="is-active"
                                to="/profile">Profile</NavLink>
                        </NavItem>
                        {signinSignout}
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default withHistory(withStore(NavBar));
