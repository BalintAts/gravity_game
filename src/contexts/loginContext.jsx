import React, { useState, createContext } from 'react'

export const IsLoggedInContext = createContext();

export const IsLoggedInProvider = props => {
    const [isLoggedIn, SetIsLoggedIn] = useState("logincontextTest");
    return (
        <IsLoggedInContext.Provider value={[isLoggedIn, SetIsLoggedIn]}>
            {props.children}
        </IsLoggedInContext.Provider>
    );
}

//  currentUserContext ?