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



const Menu = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);
    // const [loginScreen, setLoginScreen] = useState(false);
    const [menuState, setMenuState] = useState("notLoggedIn");
    const { register, handleSubmit, errors } = useForm();
    const [users, setUsers] = useState(fakeUsersData); //will be useState() , when rout works



    const close = () => {
        props.onChange();
    }

    const loggingIn = () => {
        setMenuState("loggingIn");
        ;
    }

    const logInSucces = () => {
        setMenuState("loggedIn");
    }

    const loggingOut = () => {
        setMenuState("notLoggedIn");
    }


    const onLogin = data => {
        axios.post(`http://localhost:8080/${data.userName}`, axiosConfig)
            .then(response => { console.log("response: " + response.data) })
            .catch(error => { console.log(error) });
        logInSucces();
    }

    const registerFrom = () => {
        setMenuState("registerFrom");
    }

    const onRegister = data => {
        // console.log(data);
        axios.post(`http://localhost:8080/reg`)
            .then(response => { console.log(response) })
            .catch(error => { console.log(error) });
    }

    const showLadder = () => {
        axios.get(`//localhost:8080/ladder`)
            .then(response => {
                console.log(response);
                let res = response;
                //  setUsers(res.data);
            })
            .catch(error => { console.log(error) })
        setMenuState("ladder");
        console.log(menuState);
    }

    const goBack = () => {
        if (isLoggedIn) {
            setMenuState("loggedIn")
        }
        else {
            setMenuState("notLoggedIn");
        }
    }

    useEffect(() => { }, [isLoggedIn])


    return (
        <div className="modal_wrapper">
            <div className="modal_backdrop">
                <div className="modal_box">
                    {menuState === "notLoggedIn" &&
                        <>
                            <h1 style={{ color: "white" }}>Not logged in</h1>
                            <ul>
                                <li>
                                    <button onClick={close}>Play without saving progress</button>
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
                                <input type="text" placeholder="Username" name="userName" ref={register({ required: "NAME REQUIRED, YOU MORON" })} />
                                {errors.userName && <p style={{ color: "orange" }}>{errors.userName.message}</p>}
                                <input type="submit" />
                            </form>
                            <>
                                <button onClick={goBack}>Back</button>
                            </>
                        </>

                    }
                    {menuState === "registerFrom" &&
                        <>
                            <form onSubmit={handleSubmit(onRegister)}>
                                <h1 style={{ color: "white" }}>Register page</h1>
                                <input type="text" placeholder="Username" name="userName" ref={register({ required: "NAME REQUIRED, YOU MORON" })} />
                                {errors.userName && <p style={{ color: "orange" }}>{errors.userName.message}</p>}
                                <input type="text" placeholder="password" name="password" ref={register({ required: "PASSWORD REQUIRED, YOU MORON" })} />
                                {errors.password && <p style={{ color: "orange" }}>{errors.password.message}</p>}
                                <input type="submit" />
                            </form>
                            <>
                                <button onClick={goBack}>Back</button>
                            </>
                        </>

                    }
                    {menuState === "loggedIn" &&
                        <>
                            <h1 style={{ color: "white" }}>Logged in</h1>
                            <ul>
                                <li>
                                    <button onClick={close}>New Game</button>
                                </li>
                                <li>
                                    <button onClick={close}>Load game</button>
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
                            <Table striped bordered hover style={{ "position": "center" }}>
                                <th>
                                    <td>Name</td>
                                    <td>Progress</td>
                                </th>
                                <tbody>
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
            </div>
        </div>
    )
}



export default Menu;
