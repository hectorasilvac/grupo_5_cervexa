import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { BiChevronRight } from 'react-icons/bi';
import './styles/Menu.css';

const Menu = ({ menuIsOpen, onToggleMenu }) => {

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

    if (!menuIsOpen) {
        return null;
    }

    const iconStyles = {
        color: "#b59049",
        fontSize: "3rem"
    };
    
    return (
        ReactDOM.createPortal(
            <nav id="MainMenu" className="container container-1">
                <button onClick={ () => onToggleMenu(!menuIsOpen) }>Cerrar</button>
                <ul className="unordered-list">
                { linksList.map( (link, i) => (
                    <li className="container container-2" key={i}>
                    <span className="title title-1">{link.name}</span>
                    <span><BiChevronRight style={iconStyles} /></span>
                    </li>
                    )) }
                </ul>
            </nav>,
            document.getElementById('menu')
        )
    );
}

export default Menu;