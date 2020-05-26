import React from 'react';
import '../Estilos/ToqueLabelStyle.css';
import Comentarios from './Comentarios';
import axios from 'axios';

class ToqueOpinion extends React.Component {
    state = {
        estrellas: 0,
        comentarios: [],
        cantidadComentarios: 0
    }

    componentDidMount() {
        axios.get('https://voyalagua.com/asadoyvino/api/TraerComentariosDeToque.php?idToque=' + this.props.toque.id + "")
            .then((response) => {
                console.log("cantidad comentarios: " + response.data.data.length);
                let cantidadComentarios = response.data.data.length;
                let listaComentarios = [];
                let cantidadEstrellas= response.data.data.estrellas;
                for (var i = 0; i < cantidadComentarios; i++) {
                    listaComentarios.push(response.data.data[i].comentario);
                }
                this.setState({
                    cantidadComentarios: cantidadComentarios,
                    comentarios: listaComentarios,
                })
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('https://voyalagua.com/asadoyvino/api/CantidadEstrellasToque.php?idToque=' + this.props.toque.id + "")
            .then((response) => {
                this.setState({
                    estrellas: response.data,
                })
            })
    }
    render() {
        let mostrarEstrellas = [];
        for (var i = 0; i < this.state.estrellas; i++) {
            mostrarEstrellas.push(
                <img className="iconoRock" src="https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,h_43/v1590448224/rock-and-roll_1_owavnr.png"></img>);
        }
        return (
            <div className="label">
                <div className="row">
                    <div className="columna">
                        <div>
                            <div>
                                <div className="row">
                                    <p className="nombreToque">{this.props.toque.nombre}</p>
                                </div>
                                <div className="rowUbicacionFecha">
                                    <span style={{marginRight: 5}} className="cantidadAsistentesOpinion">{this.state.cantidadComentarios} COMENTARIOS  / </span> <div className="divEstrellasOpinion"> {mostrarEstrellas}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToqueOpinion;