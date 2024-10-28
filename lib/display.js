import { createContext, useContext } from "react";

const DisplayContext = createContext();

export function DisplayProvider ({ children, display }) {
    return (
        <DisplayContext.Provider value={display}>
            {children}
        </DisplayContext.Provider>
    )
}

export function useDisplay () {
    return useContext(DisplayContext);

}