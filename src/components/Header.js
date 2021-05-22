import React from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft, BiCartAlt } from 'react-icons/bi';

import Menu from './Menu';

const Header = ({ menuIsOpen, onToggleMenu  }) => {

    const iconStyles = {
        color: "#b59049",
        fontSize: "3rem"
    };

    return (
        <header className="container container-3 bg-primary">
            <div id="SiteHeader" className="container">
                <div id="MobileMenu" onClick={ () => onToggleMenu(!menuIsOpen) }>
                    <BiMenuAltLeft style={iconStyles} />
                </div>
                <h1 id="MainTitle" className="title">Cervexa</h1>
                <div id="MobileCart">
                    <BiCartAlt style={iconStyles} />
                </div>
            </div>
            <Menu menuIsOpen={menuIsOpen} onToggleMenu={onToggleMenu} />
        </header>
    )
}

export default Header;