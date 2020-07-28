import React, { useState, useEffect, forwardRef, useContext } from 'react';
import '../styles/menuStyle.css';
import { IsLoggedInContext } from '../contexts/loginContext';

const Menu = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);

    const close = () => {
        props.onChange();
    }

    const loggingIn = () => {
        setIsLoggedIn(true);
    }

    useEffect(() => {

    }, [isLoggedIn])





    return (
        <div className="modal_wrapper">
            <div className="modal_backdrop">
                <div className="modal_box">
                    {/* <MenucontentComponent/>   this is some dynamic stuff */}
                    {/* placeholder content: */}
                    {isLoggedIn ? (
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
                                    <button onClick={close}>Log out</button>
                                </li>
                            </ul>
                        </>
                    ) : (
                            <>
                                <h1 style={{ color: "white" }}>Not logged in</h1>
                                <ul>
                                    <li>
                                        <button onClick={loggingIn}>Login</button>
                                    </li>
                                </ul>
                            </>
                        )}

                </div>
            </div>
        </div>
    )
}



export default Menu;
