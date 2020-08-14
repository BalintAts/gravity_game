import React, { useState, useEffect, forwardRef, useContext } from 'react';
import '../styles/menuStyle.css';
import { IsLoggedInContext } from '../contexts/loginContext';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Menu = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);
    // const [loginScreen, setLoginScreen] = useState(false);
    const [menuState, setMenuState] = useState("notLoggedIn");
    const { register, handleSubmit, errors } = useForm();

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
        console.log(data);
        axios.post(`localhost:8080/${data.userName}`)
            .then(response => { console.log(response) })
            .catch(error => { console.log(error) });
        logInSucces();
    }

    const registerFrom = () => {
        setMenuState("registerFrom");
    }

    const onRegister = data => {

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
                            </ul>
                        </>
                    }

                </div>
            </div>
        </div>
    )
}



export default Menu;
