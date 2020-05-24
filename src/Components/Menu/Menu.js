import React from 'react';
import {Link } from "react-router-dom";
import './Menu.css';
import DrawerToggleButton from './DrawerToggleButton';

const Menu = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton click={props.clickHandler}></DrawerToggleButton>
            </div>
            <div className="toolbar_logo"><a href="/"><p className="textoHeader">QUIERO ROCK</p></a></div>
        </nav>
    </header>
)

export default Menu;