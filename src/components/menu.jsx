import React, { useState, useEffect, forwardRef, useContext } from 'react';
import '../styles/menuStyle.css';
import { IsLoggedInContext } from '../contexts/loginContext';
import { useForm } from "react-hook-form";
import axios from 'axios';
import fakeUsersData from '../data/fakeUsers';
import axiosConfig from '../config/axiosConfig';
import ReactTable from 'react-table';
// import { table } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import tokenConfig from '../security/tokenConfig';
import ReactDom from 'react-dom';
//token only needed for "loadgame"??
import buttonFancy from '../styles/buttonFancy.css';


const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}


const Menu = ({ display, onClose }) => {


    const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);
    // const [loginScreen, setLoginScreen] = useState(false);
    const [menuState, setMenuState] = useState("notLoggedIn");
    const { register, handleSubmit, errors } = useForm();
    // const [users, setUsers] = useState(fakeUsersData); //will be useState() , when rout works
    const [users, setUsers] = useState(fakeUsersData);
    // const [currentUser, setCurrentUser] = useState(users[0]);  //init with a fakeUser
    const [currentUser, setCurrentUser] = useState();




    const close = () => {
        // props.onChange();
    }

    const loggingIn = () => {
        setMenuState("loggingIn");
        ;
    }

    const logInSucces = () => {
        setMenuState("loggedIn");
        //need to set LoggedInContext
    }

    const loggingOut = () => {
        setMenuState("notLoggedIn");
    }


    const onLogin = data => {
        console.log(data);

        axios.post(`http://localhost:8080/login`, data,

            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }
            })
            .then(response => {
                console.log("response: " + response.data);
                console.log(JSON.stringify(response.data));
                logInSucces();
                setIsLoggedIn(response.data.username);
                // localStorage.setItem('token', response.data.token);
                setCurrentUser(JSON.stringify(response.data));
                console.log(currentUser);

            })
            .catch(error => { console.log(error) });


    }

    const registerFrom = () => {
        setMenuState("registerFrom");
    }

    const onRegister = data => {
        console.log({ data });
        axios.post(`http://localhost:8080/reg`, data,
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }
            })
            .then(response => {
                console.log(response.data);
                // console.log({ users });
            })
            .catch(error => { console.log(error) });

    }

    const showLadder = () => {
        axios.get(`//localhost:8080/ladder`, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }
        })
            .then(response => {
                console.log(response.data);
                let userResp = response.data;
                let orderedUsers = userResp.sort((a, b) => b.progress - a.progress);
                setUsers(orderedUsers);
                console.log(users);
            })
            .catch(error => { console.log(error) })
        setMenuState("ladder");

    }

    const save = () => {
        axios.put(`//localhost:8080/${currentUser.name}`, currentUser.progress, axiosConfig)  //calling findUser in backend
            .then(response => {
                console.log(response);
            })
            .catch(error => { console.log(error) })
    }

    const goBack = () => {
        if (isLoggedIn) {
            setMenuState("loggedIn")
        }
        else {
            setMenuState("notLoggedIn");
        }
    }

    useEffect(() => {
        console.log("Useffect called")
        console.log(IsLoggedInContext);

        currentUser && console.log({ currentUser });
        console.log(isLoggedIn);
    },
        [isLoggedIn, users, currentUser])




    if (!display) return null;
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                {menuState === "notLoggedIn" &&
                    <>
                        {/* <h1 style={{ color: "grey", justifyContent: "center" }}>Not logged in</h1> */}
                        <ul>
                            <li>
                                <button onClick={onClose}>Play without saving progress</button>
                            </li>
                            <li>
                                <button onClick={loggingIn}>Login</button>
                            </li>
                            <li>
                                <button onClick={registerFrom}>Register to save progress</button>
                            </li>
                            <li>
                                <button onClick={showLadder}>Ladder</button>
                            </li>
                        </ul>
                    </>
                }
                {menuState === "loggingIn" &&
                    <>
                        <form onSubmit={handleSubmit(onLogin)}>
                            <h1 style={{ color: "white" }}>Login Page</h1>
                            <input type="text" placeholder="Username" name="username" ref={register({ required: "NAME REQUIRED, YOU MORON" })} />
                            {errors.username && <p style={{ color: "orange" }}>{errors.username.message}</p>}
                            <input type="submit" />
                        </form>
                        <>
                            <button onClick={goBack}>Back</button>
                        </>
                    </>

                }
                {menuState === "registerFrom" &&
                    <div className="box">
                        <form onSubmit={handleSubmit(onRegister)}>
                            <h1 style={{ color: "white" }}>Register page</h1>
                            <p>
                                <input type="text" placeholder="Username" name="username" ref={register({ required: "NAME REQUIRED, YOU MORON" })} />
                                {errors.username && <p style={{ color: "orange" }}>{errors.username.message}</p>}
                            </p>
                            <p>
                                <input type="text" placeholder="password" name="password" ref={register({ required: "PASSWORD REQUIRED, YOU MORON" })} />
                                {errors.password && <p style={{ color: "orange" }}>{errors.password.message}</p>}
                            </p>
                            <p>
                                <input type="submit" />
                            </p>
                        </form>
                        <>
                            <button onClick={goBack}>Back</button>
                        </>
                    </div>

                }
                {menuState === "loggedIn" &&
                    <>
                        {/* <h1 style={{ color: "white" }}>{currentUser.username}</h1> */}
                        <ul>
                            <li>
                                <button onClick={onClose}>New Game</button>
                            </li>
                            <li>
                                <button onClick={onClose}>Load game</button>
                            </li>
                            <li>
                                <button onClick={save}>Save game</button>
                            </li>
                            <li>
                                <button onClick={showLadder}>Ladder</button>
                            </li>
                            <li>
                                <button onClick={loggingOut}>Log out</button>
                            </li>
                            <li>
                                <button onClick={goBack}>Back</button>
                            </li>
                        </ul>
                    </>
                }
                {menuState === "ladder" &&
                    <>
                        <Table striped bordered hover style={{ "position": "center", "color": "white", "backgroundColor": "grey" }}>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>Progress</td>
                                </tr>
                                {users.map((user) => (
                                    <tr>
                                        <td key={user.name}> {user.name} </td>
                                        <td key={user.progress}> {user.progress} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <button onClick={goBack}>Back</button>
                    </>
                }
            </div>
        </>,
        document.getElementById("portal")
    )
}



export default Menu;
