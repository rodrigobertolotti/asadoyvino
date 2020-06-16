import React from 'react';
import {BrowserRouter , Route , Link, Redirect } from "react-router-dom";
import Home from './Home';
import Bandas from './Components/Bandas';
import Menu from './Components/Menu/Menu';
import SideDrawer from './Components/Menu/SideDrawer';
import Backdrop from './Components/Menu/Backdrop';
import Contacto from './Components/Contacto/Contacto';
import Proximamente from './Components/Proximamente';

class App extends React.Component{

    state = {
        sideDrawerOpen: false
    };

    abroHamburguer = () => {
        this.setState((prevState) => {
            return {
                sideDrawerOpen: !prevState.sideDrawerOpen
            }
        })
    }


    //Este metodo lo puedo usar para cerrar modales tambien
    backdropClcikHandler = () => {
        this.setState({
            sideDrawerOpen:false
        })
    }

    render(){
        return(
            <div style={{height: '100%'}}>
            <BrowserRouter>
                <Menu clickHandler={this.abroHamburguer}></Menu>
                <SideDrawer click={this.backdropClcikHandler} show={this.state.sideDrawerOpen}></SideDrawer>
                {this.state.sideDrawerOpen && <Backdrop click={this.backdropClcikHandler}></Backdrop>} 
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/home" component={Home}></Route>
                <Route path="/bandas/" component={Proximamente}></Route>
                <Route path="/contacto" component={Contacto}></Route>
            </BrowserRouter>
            </div>
        )
    }
}

export default App;