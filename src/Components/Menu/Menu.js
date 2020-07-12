import React from 'react';
import './Menu.css';
import DrawerToggleButton from './DrawerToggleButton';

const Menu = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton click={props.clickHandler}></DrawerToggleButton>
            </div>
            <div className="toolbar_logo"></div>
            <div className="derecha">
                <span>
                    <a href="https://www.instagram.com/desafinando._">
                    <img className="logoSocial" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592188084/instagram-bosquejado_v9ezxx.png"></img>
                    </a>
                    <a href="https://web.facebook.com/Desafinando-111135747301133/">
                        <img className="logoSocial" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592188094/facebook_i60bxx.png"></img>
                    </a>
                </span>
            </div>
        </nav>
        <div className="espacio"></div>
    </header>
)

export default Menu;