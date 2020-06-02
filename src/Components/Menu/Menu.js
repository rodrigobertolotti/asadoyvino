import React from 'react';
import './Menu.css';
import DrawerToggleButton from './DrawerToggleButton';

const Menu = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton click={props.clickHandler}></DrawerToggleButton>
            </div>
            <div className="toolbar_logo"><img className="imgMenu" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591021590/logo_cfxgmk.png"></img></div>
        </nav>
        <div className="espacio"></div>
    </header>
)

export default Menu;