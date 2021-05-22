import React, {useState} from "react";
import Header from "./Header";

const Layout = ({ children }) => {
    
    let [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <React.Fragment>
            <Header menuIsOpen={ menuIsOpen } onToggleMenu={ setMenuIsOpen } />
            { children }
        </React.Fragment>
    )
}

export default Layout;