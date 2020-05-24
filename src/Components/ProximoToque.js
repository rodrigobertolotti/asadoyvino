import React from 'react';
import Map from './Mapa';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { confirmarAsistencia } from '../Redux/AsistentesReducer/AsistentesActions';
import { connect } from 'react-redux';

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
            sume: verificar
        }

    }

    sumarAsistente = () => {
        axios.post('https://voyalagua.com/asadoyvino/api/AgregarAsistente.php', {
            "id": this.props.toque.id
        })
            .then((response) => {
                console.log("agregado");
                this.setState((prevState) => {
                    return {
                        cantidadAsistentes: parseInt(prevState.cantidadAsistentes) + 1,
                        estiloContador: "subtituloChicoSume",
                        sume: !prevState.sume
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

        return (
            <div>
            <div className="divAgregar">
                <table className="tablaCaract">
                    <tr>
                        <td className="campoTablaIcono"><i class="fas fa-2x fa-users"></i></td>
                        <td className="campoTablaTexto"><p className={this.state.estiloContador}>{this.state.cantidadAsistentes}</p></td>
                        <td className="campoTablaIcono"><i class="fas fa-2x fa-map-marker-alt"></i></td>
                        <td className="campoTablaTexto"><p className="subtituloChico">{this.props.toque.lugar}</p></td>
                    </tr>
                    <tr>
                        <td className="campoTablaIcono"><i class="fas fa-2x fa-dollar-sign"></i></td>
                        <td className="campoTablaTexto"><p className="subtitulochico">{this.props.toque.precioEntradas}</p></td>
                        <td className="campoTablaIcono"><i class="fas fa-2x fa-ticket-alt"></i></td>
                        <td className="campoTablaTexto"><p className="subtitulochico">{this.props.toque.ventaEntradas}</p></td>
                    </tr>
                </table>
            </div>
            <center>
                <div className="espacio"></div>
            </center>
            <div className="espacio"></div>
            <p className="texto">{this.props.toque.descripcion}</p>
            <div className="row">
                <div className="columna1">
                    {this.state.sume === false && <Button className="botonAsistire" disabled={this.state.sume} variant="contained" color="primary" onClick={this.sumarAsistente}>
                        <p className="textoBoton">VOY</p>
                    </Button>}
                    {this.state.sume === true &&
                        <div className="centrado">
                            <p className="subtituloChicoSume">ASISTIRAS</p>
                        </div>}
                </div>
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