import React from 'react';
import './Menu.css';
import DrawerToggleButton from './DrawerToggleButton';

const Menu = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton click={props.clickHandler}></DrawerToggleButton>
            </div>
            <div className="toolbar_logo"><img className="imgMenu" src="https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,w_251/v1592596605/WhatsApp_Image_2020-06-18_at_18.32.53_zaxqrw.jpg"></img></div>
            <div className="derecha">
                <span>
                <img href="https://google.com"  className="logoSocial" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592188084/instagram-bosquejado_v9ezxx.png"></img>
                <img className="logoSocial" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592188094/facebook_i60bxx.png"></img>
                </span>
            </div>
        </nav>
        <div className="espacio"></div>
    </header>
)

export default Menu;