import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BiChevronRight } from 'react-icons/bi';
import './styles/Menu.css';

const Menu = ({ isOpen, onToggle, iconStyles }) => {

    let [categoryList, setCategoryList] = useState([]);

    const fetchCategories = useCallback(() => {
        fetch('http://api.cvx.hector.com.co/categories')
        .then(response => response.json())
        .then(({data}) => {
            setCategoryList(data)
        })
    }, []);

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories]);

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

    if (!isOpen) return null;
    
    const menuContainer = document.getElementById('menu');
    return (
        ReactDOM.createPortal(
            <nav className="main-menu">
            <p>Hola Menu</p>
            <button onClick={ () => onToggle(!isOpen) }>Cerrar</button>
            {/* <ul>
                {
                    categoryList.map((category, i) => (
                        <li key={i}>
                            {category.name}
                        </li>
                    ))
                }
            </ul> */}

                {/* <button onClick={ () => onToggle(!isOpen) }>Cerrar</button>
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