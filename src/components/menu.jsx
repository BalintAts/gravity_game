import React, { useState, useEffect, forwardRef, useContext } from 'react';
import '../styles/menuStyle.css';
import { IsLoggedInContext } from '../contexts/loginContext';

const Menu = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);
    // const [loginScreen, setLoginScreen] = useState(false);
    const [menuState, setMenuState] = useState("notLoggedIn");

    const close = () => {
        props.onChange();
    }

    const loggingIn = () => {
        setMenuState("loggingIn");
    }

    const logInSend = () => {
        setMenuState("loggedIn");
    }

    const loggingOut = () => {
        setMenuState("notLoggedIn");
    }

    useEffect(() => { }, [isLoggedIn])


    return (
        <div className="modal_wrapper">
            <div className="modal_backdrop">
                <div className="modal_box">
                    {/* {isLoggedIn ? (
                        <>
                            <h1 style={{ color: "white" }}>Logged in</h1>
                            {strysomething}
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
                    ) : (
                            <>
                                <h1 style={{ color: "white" }}>Not logged in</h1>
                                <ul>
                                    <li>
                                        <button onClick={loggingIn}>Play without saving progress</button>
                                    </li>
                                    <li>
                                        <button onClick={loggingIn}>Login</button>
                                    </li>
                                    <li>
                                        <button onClick={loggingIn}>Register to save progress</button>
                                    </li>
                                </ul>
                            </>
                        )} */}
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
                                    <button onClick={loggingIn}>Register to save progress</button>
                                </li>
                            </ul>
                        </>
                    }
                    {menuState === "loggingIn" &&
                        <>
                            <h1 style={{ color: "white" }}>Login Page</h1>
                            <button onClick={logInSend}>Login</button>
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
