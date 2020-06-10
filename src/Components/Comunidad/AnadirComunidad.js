import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './EstilosComunidad.css';

class AnadirComunidad extends React.Component {

    state = {
        estiloTransporte: "habilitado",
        estiloEntradas: "deshabilitado",
        estiloComentarios: "deshabilitado",
        detalleAgregar: "Vas solo? Que no te sobre lugar!"

    }

    clickBoleto = () => {
        this.setState({
            estiloTransporte: "deshabilitado",
            estiloEntradas: "habilitado",
            estiloComentarios: "deshabilitado",
            detalleAgregar: "Te sobran entradas? "
        })
    }

    clickTransporte = () => {
        this.setState({
            estiloTransporte: "habilitado",
            estiloEntradas: "deshabilitado",
            estiloComentarios: "deshabilitado",
            detalleAgregar: "Vas solo? Que no te sobre lugar!"
        })
    }

    clickComentarios = () => {
        this.setState({
            estiloTransporte: "deshabilitado",
            estiloEntradas: "deshabilitado",
            estiloComentarios: "habilitado",
            detalleAgregar: "Agregar comentarios, coordina la previa o el after!"
        })
    }

    render() {
        return (
            <div className="containerAgregarOpinion">
                <div className="row">
                    <span className="tituloSeccion">
                        Agregar a este toque:
                    </span>
                </div>
                <div className="row">
                    <table className="tablaOpcionesComunidad">
                        <tr>
                            <td>
                                <img
                                    src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/transporte_d84leg.png"
                                    alt=""
                                    onClick={this.clickTransporte}
                                    className={this.state.estiloTransporte}
                                ></img>
                            </td>
                            <td className="deshabilidato">
                                <img
                                    alt=""
                                    className={this.state.estiloComentarios}
                                    onClick={this.clickComentarios}
                                    src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/libro_jf3no2.png"></img>
                            </td>
                            <td>
                                <img
                                    alt=""
                                    className={this.state.estiloEntradas}
                                    onClick={this.clickBoleto}
                                    src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/boleto_bhauxy.png"></img>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="row">
                    <TextField
                        style={{ fontSize: 12, width: '80%', margin: 20 }}
                        multiline
                        rows={3}
                        onChange={this.handleChangeDescripcion}
                        label={this.state.detalleAgregar} />
                </div>
                <div className="row">
                    <Button color="primary" onClick={this.agregarToque} variant="contained">
                        <p className="textoBoton">AGREGAR</p>
                    </Button>
                </div>
            </div>
        )
    }
}

export default AnadirComunidad;