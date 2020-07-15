import React, { useState, useEffect, forwardRef } from 'react';
import '../styles/menuStyle.css';

const Menu = (props) => {

    const close = () => {

    }


    return (
        <div className="modal_wrapper">
            <div className="modal_backdrop">
                <div className="modal_box">
                    {/* <MenucontentComponent/>   this is some dynamic stuff */}
                    {/* placeholder content: */}
                    <ul>
                        <li>
                            <h11>LITTLE GREEDY BLACKHOLE</h11>
                        </li>
                        <li>
                            <button>New Game</button>
                        </li>
                        <li>
                            <button onClick={close}>Continue</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
    // } else {
    //     return null;
    // }
}



export default Menu;
