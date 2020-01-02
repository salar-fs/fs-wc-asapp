import React, { useState } from 'react';
import withStore from '../../hoc/withStore';
import {
    Label,
    Input,
    Button,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    Alert,
} from 'reactstrap';
import './LoginForm.scss';
import { userSchemes } from '../../schemes/users';
import { useHistory } from 'react-router-dom';

const LoginForm = (props) => {
    const { appStore } = props;
    const { state, dispatch } = appStore;
    const history = useHistory();

    if (state.user.isAuthenticated) {
        history.push('/');
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    const [error, setError] = useState('');

    const passwordConditions = [
        { order: 1, title: 'Minimum of 8 and maximum of 32 characters' },
        // { order: 2, title: 'At least one upprcase letter' },
        // { order: 3, title: 'At least one lowercase letter' },
        // { order: 4, title: 'At least one number' },
        // { order: 5, title: 'At least one special character' },
    ];

    const handleSubmit = () => {
        // validate input
        const validationResult = userSchemes.loginSchema.validate({ email, password, retypedPassword });
        if (validationResult.error) {
            setError(validationResult.error.message);
        }
        if (password === retypedPassword) {
            // login
            dispatch({ type: 'USER_LOGIN', payload: { email: email } });
            history.push('/');
        } else {
            setError('Passwords do not match');
        }
    };

    return (
        <>
            <Label for="emailInput" className="sr-only">Email</Label>
            <Input
                className="formControl"
                type="email"
                id="emailInput"
                placeholder="Email"
                autoFocus
                onChange={e => (setError(''), setEmail(e.target.value.trim().toLowerCase()))}
                value={email} />
            <Label for="passwordInput" className="sr-only">Password</Label>
            <Input
                className="formControl"
                type="password"
                id="passwordInput"
                placeholder="Password"
                onChange={e => (setError(''), setPassword(e.target.value.trim()))}
                value={password} />
            <Label for="retypePasswordInput" className="sr-only">Retype Password</Label>
            <Input
                className="formControl"
                type="password"
                id="retypePasswordInput"
                placeholder="Retype Password"
                onChange={e => (setError(''), setRetypedPassword(e.target.value.trim()))}
                value={retypedPassword} />
            <Button
                block
                color="primary"
                size="lg"
                type="button"
                onClick={handleSubmit}
            >Sign in</Button>
            <UncontrolledPopover trigger="focus" placement="right" target="passwordInput">
                <PopoverHeader>Passwords must have:</PopoverHeader>
                <PopoverBody>
                    <ul className="passwordOptions">
                        {passwordConditions.map(condition => <li key={condition.order}>{condition.title}</li>)}
                    </ul>
                </PopoverBody>
            </UncontrolledPopover>
            {error ? <Alert color="danger" id="validationAlert">
                <>{error}</>
            </Alert> : null}
        </>
    );
}

export default withStore(LoginForm);
