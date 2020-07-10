import React, { useState, useEffect } from 'react';
import '../styles/menuStyle.css';

const Menu = () => {
    const [display, setDisplay] = useState(false);


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
                            <button>Continue</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu;
