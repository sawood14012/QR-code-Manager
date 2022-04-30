import React, { useContext, useState } from 'react';
import {
  LoginFooterItem,
  LoginForm,
  LoginMainFooterBandItem,
  LoginMainFooterLinksItem,
  LoginPage,
  ListItem,
  FormSelect,
  FormSelectOption
} from '@patternfly/react-core';
import {handleLogin} from '@app/utils/firebase';
import { useHistory, useLocation } from 'react-router-dom';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import { Context } from '@app/store/store';

const Login = () => {
  const { state, dispatch } = useContext(Context) 
  const [showHelperText, setShowHelperText] = useState(false)
  const [selectedType, setType] = useState("User")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();


    const handleUsernameChange = value => {
      setUsername(value)
    };



    const handlePasswordChange = passwordValue => {
        setPassword(passwordValue)
    };

    const onLoginButtonClick = event => {
        
      event.preventDefault();
      handleLogin(username,password).then((value) => {
        dispatch({type: "SET_USER", data: value['uid']})
        history.push(location)
      })
    };

    const onSelectChange = (v,event) => {
        setType(v)
    }
  

    const helperText = (
      <React.Fragment>
        <ExclamationCircleIcon />
        &nbsp;Invalid login credentials.
      </React.Fragment>
    );

    const signUpForAccountMessage = (
      <LoginMainFooterBandItem>
        Need an account? <a href="#">Sign up.</a>
      </LoginMainFooterBandItem>
    );
    const forgotCredentials = (
      <LoginMainFooterBandItem>
        <a href="#">Forgot username or password?</a>
      </LoginMainFooterBandItem>
    );

    const options = [
        { value: 'User', label: 'User', disabled: false },
        { value: 'Master', label: 'Master', disabled: false },
        { value: 'Admin', label: 'Admin', disabled: false },
      ];



    return (
    
      <LoginPage
        loginTitle="Log in to your account"
        loginSubtitle="Enter your single sign-on LDAP credentials."
        signUpForAccountMessage={signUpForAccountMessage}
        forgotCredentials={forgotCredentials}
      >
          <FormSelect value={selectedType} onChange={onSelectChange} aria-label="FormSelect Input">
        {options.map((option, index) => (
          <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
        ))} </FormSelect> <br />

        <LoginForm
        showHelperText={showHelperText}
        helperText={helperText}
        helperTextIcon={<ExclamationCircleIcon />}
        usernameLabel="Username/Email"
        usernameValue={username}
        onChangeUsername={handleUsernameChange}
        passwordLabel="Password"
        passwordValue={password}
        isShowPasswordEnabled
        onChangePassword={handlePasswordChange}
        rememberMeLabel="Keep me logged in for 30 days."
        isRememberMeChecked={true}
        onLoginButtonClick={onLoginButtonClick}
        loginButtonLabel="Log in">
            
        </LoginForm>
        
      
      </LoginPage>
    );
  
}

export {Login}