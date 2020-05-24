import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

const SideDrawer = props => {

    let drawerClass= 'side-drawer';
    if (props.show){
        drawerClass= 'side-drawer open';
    }

    return(
    <nav className={drawerClass}>
        <ul>
            <li><Link onClick={props.click} to='/home'><p className="textoMenu">HOME</p></Link></li>
            <li><Link onClick={props.click} to='/bandas'><p className="textoMenu">BANDAS</p></Link></li>
            <li><Link onClick={props.click} to='/contacto'><p className="textoMenu">CONTACTO</p></Link></li>
        </ul>
    </nav>
    )
}

export default SideDrawer;