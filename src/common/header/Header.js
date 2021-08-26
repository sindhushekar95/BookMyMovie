import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import "./Header.css";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div p={3}>
                    <span>{children}</span>
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Header = () => {
    const baseUrl = "http://localhost:8085/api/v1/";
    const [openModal, setOpenModal] = React.useState(false);
    const [value, setValue] = React.useState(0);

    /*Form States*/
    const [firstName, setFirstName] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");

    const [lastName, setLastName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const [pwd, setPwd] = useState("");
    const [errorPwd, setErrorPwd] = useState("");

    const [no, setNo] = useState("");
    const [errorNo, setErrorNo] = useState("");

    const [userName, setUserName] = useState("");
    const [errorUserName, setErrorUserName] = useState("");

    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [registerMessage, setRegisterMessage] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const [login, setShowLogin] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setShowLogin(true);
        };
    }, []);

    const handleLogin = () => {
        setOpenModal(true);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const inputFirstChangeHandler = (event) => {
        let data = event.target.value;
        if (data) {
            setFirstName(data);
            setErrorFirstName(false);
        } else
            setErrorFirstName(true);
    };

    const inputLastChangeHandler = (event) => {
        let data = event.target.value;
        if (data) {
            setLastName(data);
            setErrorLastName(false);
        } else
            setErrorLastName(true);
    };

    const inputEmailChangeHandler = (event) => {
        let data = event.target.value;
        if (data) {
            setEmail(data);
            setErrorEmail(false);
        } else
            setErrorEmail(true);
    };

    const inputPwdChangeHandler = (event) => {
        let data = event.target.value;
        if (data) {
            setPwd(data);
            setErrorPwd(false);
        } else
            setErrorPwd(true);
    };

    const inputPasswordChangeHandler = (event) => {
        let data = event.target.value;
        if (data) {
            setPassword(data);
            setErrorPassword(false);
        } else
            setErrorPassword(true);
    };

    const inputUserNameChangeHandler = (event) => {
        let data = event.target.value;
        if (data) {
            setUserName(data);
            setErrorUserName(false);
        } else
            setErrorUserName(true);
    };

    const inputNoChangeHandler = (event) => {
        let data = event.target.value;
        if (data) {
            setNo(data);
            setErrorNo(false);
        } else
            setErrorNo(true);
    };

    const registerButtonHandler = async () => {

        firstName === "" ? setErrorFirstName(true) : setErrorFirstName(false);
        lastName === "" ? setErrorLastName(true) : setErrorLastName(false);
        email === "" ? setErrorEmail(true) : setErrorEmail(false);
        pwd === "" ? setErrorPwd(true) : setErrorPwd(false);
        no === "" ? setErrorNo(true) : setErrorNo(false);

        if (firstName === "" || lastName === "" || email === "" || pwd === "" || no === "") {
        }
        else {
            let details = {
                "email_address": email,
                "first_name": firstName,
                "last_name": lastName,
                "mobile_number": no,
                "password": pwd
            };
            try {
                const rawResponse = await fetch(baseUrl + "signup", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(details)
                });
                const data = await rawResponse.json();
                console.log(data);
                if (data.code === "USR-009") {
                    setRegisterMessage("User already exists. Please Login!");
                } else {
                    setRegisterMessage("Registration Successful. Please Login!");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const loginButtonHandler = async () => {

        userName === "" ? setErrorUserName(true) : setErrorUserName(false);
        password === "" ? setErrorPassword(true) : setErrorPassword(false);

        if (userName === "" || password === "") {
        } else {
            console.log(window.btoa(userName + ":" + password));
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    "authorization": "Basic " + window.btoa(userName + ":" + password)
                }
            }
            try {
                const rawResponse = await fetch(baseUrl + "auth/login", requestOptions);
                const result = await rawResponse.json();
                if (result.code === "USR-002") {
                    setLoginMessage("Username does not exist. Please Register !")
                } else {
                    setOpenModal(false);
                    sessionStorage.setItem("user", result);
                    setShowLogin(true);
                }
            } catch (error) {

            }
        }
    }

    const handleLogout = () => {
        setShowLogin(false);
        sessionStorage.clear();
    }

    return (
        <div className="headerBar dFlex alignCenter">
            <img src={logo} className="appLogo" alt="logo" />
            {!login &&
                <Button variant="contained" className="mlAuto" color="default" onClick={handleLogin}>Login</Button>
            }
            {login &&
                <Button variant="contained" className="mlAuto" color="default" onClick={handleLogout}>Logout</Button>
            }
            {/* {isBookShow &&
                <Button variant="contained" color="primary">Book Show</Button>
            } */}
            <Modal
                isOpen={openModal}
                contentLabel="Minimal Modal Example" ariaHideApp={false} className="reactModalCustom"
            >
                <AppBar position="static" className="bgNone boxShadowNone" color="default">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="secondary">
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <form noValidate className="dFlex alignCenter justifyCenter flexColumn p15">
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="userName">Username</InputLabel>
                            <Input id="userName" onChange={inputUserNameChangeHandler} />
                            <FormHelperText error className={errorUserName ? 'dBlock' : 'dNone'}>required</FormHelperText>
                        </FormControl>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" onChange={inputPasswordChangeHandler} />
                            <FormHelperText error className={errorPassword ? 'dBlock' : 'dNone'}>required</FormHelperText>
                        </FormControl>
                        <Typography>{loginMessage}</Typography>
                        <Button className="mt16" variant="contained" color="primary" onClick={loginButtonHandler}>Login</Button>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form noValidate className="dFlex alignCenter justifyCenter flexColumn p15">
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" onChange={inputFirstChangeHandler} />
                            <FormHelperText error className={errorFirstName ? 'dBlock' : 'dNone'}>required</FormHelperText>
                        </FormControl>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input id="lastName" onChange={inputLastChangeHandler} />
                            <FormHelperText error className={errorLastName ? 'dBlock' : 'dNone'}>required</FormHelperText>
                        </FormControl>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="email" onChange={inputEmailChangeHandler} />
                            <FormHelperText error className={errorEmail ? 'dBlock' : 'dNone'}>required</FormHelperText>
                        </FormControl>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="pwd">Password</InputLabel>
                            <Input id="pwd" type="password" onChange={inputPwdChangeHandler} />
                            <FormHelperText error className={errorPwd ? 'dBlock' : 'dNone'}>required</FormHelperText>
                        </FormControl>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="number" onChange={inputNoChangeHandler} />
                            <FormHelperText error className={errorNo ? 'dBlock' : 'dNone'}>required</FormHelperText>
                        </FormControl>
                        <Typography>{registerMessage}</Typography>
                        <Button className="mt16" variant="contained" color="primary" onClick={registerButtonHandler}>Register</Button>
                    </form>
                </TabPanel>
            </Modal>
        </div>
    )
}

export default Header;