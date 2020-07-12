import React from 'react';
import '../Estilos/ToqueLabelStyle.css';
import axios from 'axios';

class ToqueOpinion extends React.Component {
    state = {
        estrellas: 0,
        comentarios: [],
        cantidadComentarios: 0
    }

    componentDidMount() {
        axios.get('https://desafinando.com/asadoyvino/api/TraerComentariosDeToque.php?idToque=' + this.props.toque.id + "")
            .then((response) => {
                console.log("cantidad comentarios: " + response.data.data.length);
                let cantidadComentarios = response.data.data.length;
                let listaComentarios = [];
                let cantidadEstrellas = response.data.data.estrellas;
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
        axios.get('https://desafinando.com/asadoyvino/api/CantidadEstrellasToque.php?idToque=' + this.props.toque.id + "")
            .then((response) => {
                this.setState({
                    estrellas: response.data,
                })
            })
    }
    render() {
        let mostrarEstrellas = [];
        let fecha = this.props.toque.fecha;
        let fechaSplitArray = fecha.split("-");
        let nuevaFecha = fechaSplitArray[2] + "/" + fechaSplitArray[1];
        for (var i = 0; i < this.state.estrellas; i++) {
            mostrarEstrellas.push(
                <img className="iconoRock" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1590447939/rock-and-roll_f4axis.png"></img>);
        }
        return (
            <div className="labelFinalizado">
                <div className="column4">
                    <div className="row">
                        <span className="nombreToque">{this.props.toque.nombre}</span>
                    </div>
                    <div className="row">
                    <p className="lugar">{this.props.toque.lugar} - <strong>{nuevaFecha}</strong></p>
                </div>
                    <div className="row">
                        <div className="divEstrellasOpinion">
                            {mostrarEstrellas} ({this.state.cantidadComentarios})
                        </div>
                    </div>
                </div>
                <div className="column2">
                {this.props.toque.linkImagen.length>3 ?
                <img className="miniaturaImagen" src={this.props.toque.linkImagen}></img>
                :
                <img className="miniaturaImagen" src="https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,w_157/v1593011894/LogoA_cuadrado_odqerz.png"></img>
                }
                </div>
            </div>
        )
    }
}

export default ToqueOpinion;