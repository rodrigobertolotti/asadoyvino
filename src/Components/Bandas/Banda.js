import React from 'react';
import './Bandas.css';
import Discos from './Discos';
import Integrantes from './Integrantes';
import axios from 'axios';

class Banda extends React.Component {

    state = {
        discosBanda: [],
        busque: false
    }

    render() {
        return (
            <>
            {this.props.cargando===true && <p className="nombreBanda">CARGANDO...</p>}
            {this.props.cargando===false &&
                <div className="rowBanda">
                    <p className="nombreBanda">{this.props.banda.nombre}</p>
                    <div className="containerDescripcion">
                        <div className="divDescripcion">
                            <p class="descripcion">{this.props.banda.descripcion}</p>
                        </div>
                        <div className="divExtraDescripcion">
                            <img className="logoGrande" src={this.props.banda.logo}></img>
                        </div>
                    </div>
                <Discos discos={this.props.discosBanda}></Discos>
                <Integrantes idBanda={this.props.banda.id}></Integrantes>
                </div>
            }
            </>
        )
    }
}

export default Banda;