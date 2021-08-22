import React from "react";
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Header = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const handleLoginOpen = () => {
        setOpenModal(true);
    };

    // const handleLoginClose = () => {
    //     setOpenModal(false);
    // };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="headerBar dFlex alignCenter">
            <img src={logo} className="appLogo" alt="logo" />
            <Button variant="contained" className="mlAuto" color="default" onClick={handleLoginOpen}>Login</Button>
            <Button variant="contained" color="default">Logout</Button>
            <Button variant="contained" color="primary">Book Show</Button>
            <Modal
                isOpen={openModal}
                contentLabel="Minimal Modal Example" ariaHideApp={false} className="reactModalCustom"
            >
                <AppBar position="static" className="bgNone boxShadowNone" color="default">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="secondary">
                        <Tab label="Login" {...a11yProps(0)} />
                        <Tab label="Register" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <form className="dFlex alignCenter justifyCenter flexColumn p15">
                        <div className="mb15">
                            <TextField id="username" required label="Username" />
                        </div>
                        <div className="mb15">
                            <TextField id="password" required label="Password" type="password" />
                        </div>
                        <Button variant="contained" color="primary">Login</Button>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form className="dFlex alignCenter justifyCenter flexColumn p15">
                        <div className="mb15">
                            <TextField id="firstName" validations={["required"]} helperText="required" label="First Name" />
                        </div>
                        <div className="mb15">
                            <TextField id="lastName" validations={["required"]} helperText="required" label="Last Name" />
                        </div>
                        <div className="mb15">
                            <TextField id="email" validations={["required"]} helperText="required" label="Email" type="email" />
                        </div>
                        <div className="mb15">
                            <TextField id="password" validations={["required"]} helperText="required" label="Password" type="password" />
                        </div>
                        <div className="mb15">
                            <TextField id="contact" validations={["required"]} helperText="required" label="Contact No." type="number" />
                        </div>
                        <Button variant="contained" color="primary" type="submit">Register</Button>
                    </form>
                </TabPanel>
                {/* <button onClick={handleLoginClose}>Close Modal</button> */}
            </Modal>
        </div>
    )
}

export default Header;