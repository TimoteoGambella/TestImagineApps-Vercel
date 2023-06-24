import { createContext, useEffect, useState } from 'react';

export const UseAppContext = createContext();

export default function AppContext({children}){
    return(
        <UseAppContext.Provider value={{  }}>
            {children}
        </UseAppContext.Provider>
    )
}