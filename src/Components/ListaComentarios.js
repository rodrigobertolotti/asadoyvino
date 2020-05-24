import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../Estilos/Comentarios.css';
import '../Estilos/Estrellas.css';
import Divider from '@material-ui/core/Divider';

export default function ListaComentarios(props) {
    console.log(props);
    return (
        <div className="divComentarios">
            <List>
                {props.opiniones.map((opinion) => (
                    <ListItem>
                        <Comentario usuario={opinion[0]} comentario={opinion[1]} estrellas={opinion[2]}></Comentario>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

function Comentario(props){
    let mostrarEstrellas = [];
    for (var i = 0; i < props.estrellas; i++) {
        mostrarEstrellas.push(
            <i
                class={`fas fa-star azules`}>
            </i>);
    }
    return(
        <div className="comentario">
                    <p className="usuarioComentario">{props.usuario} {mostrarEstrellas}</p>
        <p className="comentarioComentario">{props.comentario}</p>
        <Divider style={{width: '100%'}}></Divider>
        </div>
    )
}
