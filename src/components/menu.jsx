import React, { useState, useEffect, forwardRef } from 'react';
import '../styles/menuStyle.css';

const Menu = forwardRef(() => {
    const [display, setDisplay] = useState(true);

    const open = () => {
        setDisplay(true);
    }

    const close = () => {
        setDisplay(false);
    }

    if (display) {
        return (
            <div className="modal_wrapper">
                <div onClick={close} className="modal_backdrop">
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
                                <button>Continue</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
})



export default Menu;
