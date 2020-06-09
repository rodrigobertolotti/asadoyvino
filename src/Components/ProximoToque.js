import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { confirmarAsistencia } from '../Redux/AsistentesReducer/AsistentesActions';
import { connect } from 'react-redux';
import '../Estilos/ModalProximoToque.css';
import BeatLoader from "react-spinners/BeatLoader";

class ProximoToque extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        let verificar = this.verificarAsistencia();
        let sumoUno = 0;
        if (verificar === true) {
            sumoUno = 1;
        }
        let cantidadTotal = parseInt(this.props.toque.cantidadAsistentes) + sumoUno;
        this.state = {
            cantidadAsistentes: cantidadTotal,
            estiloContador: "subtitulochico",
            sume: false,
            loadingSumar: false
        }

    }

    sumarAsistente = () => {
        this.setState({
            loadingSumar: true,
        })
        axios.post('https://desafinando.com/asadoyvino/api/AgregarAsistente.php', {
            "id": this.props.toque.id
        })
            .then((response) => {
                this.setState((prevState) => {
                    return {
                        cantidadAsistentes: parseInt(prevState.cantidadAsistentes) + 1,
                        estiloContador: "subtituloChicoSume",
                        sume: true,
                        loadingSumar: false
                    }
                })
            })
            .catch((error) => console.log(error))
        this.props.confirmoAsistencia(this.props.toque.id);
    }

    verificarAsistencia = () => {
        for (var i = 0; i < this.props.asiste.length; i++) {
            if (this.props.asiste[i] === this.props.id) {
                return true;
            };
        }
        return false;
    }

    render() {
        let fecha = this.props.toque.fecha;
        let fechaSplitArray = fecha.split("-");
        let nuevaFecha = fechaSplitArray[2] + "/" + fechaSplitArray[1];
        return (
            <div>
                <div className="divAgregar">
                    <table>
                        <td>
                            <tr><span className="textoCaracteristicas">Cantidad asistentes: </span><span className={this.state.estiloContador}>{this.state.cantidadAsistentes}</span></tr>
                            <tr><span className="textoCaracteristicas">Fecha y hora: <strong>{nuevaFecha} - {this.props.toque.hora}</strong></span></tr>
                            <tr><span className="textoCaracteristicas">Lugar: <strong>{this.props.toque.lugar}, {this.props.toque.departamento}</strong></span></tr>
                            <tr><span className="textoCaracteristicas">Precio entradas: <strong>{this.props.toque.precioEntradas}</strong></span></tr>
                            <tr><span className="textoCaracteristicas">Puntos de venta: <strong>{this.props.toque.ventaEntradas}</strong></span></tr>
                        </td>
                    </table>
                </div>
                <div className="espacio"></div>
                <div className="rowProximoToque">
                    <img className="flyerToque" alt="" src={this.props.toque.linkImagen} />
                    <p className="textoDescripcion">{this.props.toque.descipcion}</p>
                    <div className="espacio"></div>
                    <div className="columna1">
                        {this.state.loadingSumar === false &&
                            (
                                this.state.sume === false ?
                                    <Button
                                        style={{ marginBottom: 15 }}
                                        className="botonAsistire"
                                        disabled={this.state.sume}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.sumarAsistente}
                                        startIcon={
                                            <Avatar src={'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590786469/lista-de-quehaceres_mmlabw.png'} />}>
                                        <p className="textoBoton"> VOY</p>
                                    </Button>
                                    :
                                    (
                                        <div className="centrado">
                                            <p className="subtituloChicoSume">ASISTIRAS</p>
                                            <img src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1590867312/rock_i8ls6v.png"></img>
                                        </div>
                                    )
                            )
                        }
                        {
                            this.state.loadingSumar === true &&
                            <div className="centrado">
                                <BeatLoader
                                    size={30}
                                    color={"#123abc"}
                                />
                            </div>
                        }
                    </div>
                    <div className="espacio"></div>
                </div>
            </div >

        )
    }
}

const mapStateToProps = (state) => ({
    asiste: state.asistentes.asistencias
})

const mapDispatchToProps = (dispatch) => ({
    confirmoAsistencia: (idToque) => dispatch(confirmarAsistencia(idToque))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProximoToque);