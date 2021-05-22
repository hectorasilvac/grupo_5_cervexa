import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { BiChevronRight } from 'react-icons/bi';
import './styles/Menu.css';

const Menu = ({ menuIsOpen, onToggleMenu, iconStyles }) => {

    const fetchData = useCallback(() => {
        fetch('')
    });

    const linksList = [
        {
            name: 'Inicio'
        },
        {
            name: 'Cerveza'
        },
        {
            name: 'Licor'
        }
    ];

    if (!menuIsOpen) return null;
    
    const menuContainer = document.getElementById('menu');
    return (
        ReactDOM.createPortal(
            <nav className="main-menu">
            <p>Hola Menu</p>
            <button onClick={ () => onToggleMenu(!menuIsOpen) }>Cerrar</button>

                {/* <button onClick={ () => onToggleMenu(!menuIsOpen) }>Cerrar</button>
                <ul className="unordered-list">
                { linksList.map( (link, i) => (
                    <li className="container container-2" key={i}>
                    <span className="title title-1">{link.name}</span>
                    <span><BiChevronRight style={iconStyles} /></span>
                    </li>
                    )) }
                </ul> */}

            </nav>,
            menuContainer
        )
    );
}

export default Menu;