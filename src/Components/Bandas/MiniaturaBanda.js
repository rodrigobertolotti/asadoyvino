import React from 'react';
import '../../Estilos/Buscador.css';
import Container from '@material-ui/core/Container';

const MiniaturaBanda = props => (
    <div className="miniaturaBanda">
        <img className="logo" src={props.logoBanda}></img>
        </div>
)

export default MiniaturaBanda;



