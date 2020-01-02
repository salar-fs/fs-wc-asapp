import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import withState from '../../hoc/withStore';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = rest.appStore.state;

    return (
        <Route
            {...rest}
            render={props => (
                user.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            )} />
    );
};

export default withState(PrivateRoute);
