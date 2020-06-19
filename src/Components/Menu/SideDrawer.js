import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

const SideDrawer = props => {

    let drawerClass= 'side-drawer';
    if (props.show){
        drawerClass= 'side-drawer open';
    }

    return(
        <>
    <nav className={drawerClass}>
    <center>
            <img src="https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,w_251/v1592596605/WhatsApp_Image_2020-06-18_at_18.32.53_zaxqrw.jpg"></img>
        </center>
        <ul className="ulMenu">
            <li><Link onClick={props.click} to='/home'><p className="textoMenu">HOME</p></Link></li>
            <li><Link onClick={props.click} to='/bandas'><p className="textoMenu">BANDAS</p></Link></li>
            <li><Link onClick={props.click} to='/contacto'><p className="textoMenu">CONTACTO</p></Link></li>
        </ul>
    </nav>
    </>
    )
}

export default SideDrawer;