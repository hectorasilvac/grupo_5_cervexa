import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft, BiCartAlt } from 'react-icons/bi';

import Menu from './Menu';
import './styles/Header.css';

const Header = () => {

    let [menuIsOpen, setMenuIsOpen] = useState(false);

    const iconStyles = {
        color: "#b59049",
        fontSize: "3rem"
    };

    return (
        <header className="container container--painted">
           <div className="site-header">
               <div className="mobile-menu" onClick={ () => setMenuIsOpen(!menuIsOpen) }>
                   <BiMenuAltLeft style={iconStyles} />
               </div>
               <h1 className="main-title">
               Cervexa
               </h1>
               <div className="mobile-cart">
                   <BiCartAlt style={iconStyles} />
               </div>
           </div>
           <Menu isOpen={menuIsOpen} onToggle={setMenuIsOpen} iconStyles={iconStyles} />
        </header>
    )
}

export default Header;