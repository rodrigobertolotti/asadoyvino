import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Contacto.css';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

class Contacto extends React.Component {

    state = {
        nombre: '',
        mail: '',
        mensaje: '',
        enviado: false,
        cargando: false
    }

    enviarMensaje = () => {
        this.setState({
            cargando: true
        })
        axios.post('https://desafinando.com/asadoyvino/api/AgregarContacto.php', {
            "nombre": this.state.nombre,
            "mail": this.state.mail,
            "mensaje": this.state.mensaje
        })
            .then(() => {
                this.setState({
                    enviado: true,
                    cargando: false
                })
            })
    }
    onChangeNombre = (e) => {
        this.setState({
            nombre: e.target.value
        })
    }

    onChangeMail = (e) => {
        this.setState({
            mail: e.target.value
        })
    }

    onChangeMensaje = (e) => {
        this.setState({
            mensaje: e.target.value
        })
    }

    render() {
        return (
            <div className="fondoContacto">
                <div className="columnContacto">
                    {this.state.enviado===false && 
                    <>
                    <div className="rowContacto">
                        <p className="textoContacto">Contactate con nosotros</p>
                    </div>
                    <div className="row">
                        <TextField
                            multiline
                            onChange={this.onChangeNombre}
                            style={{ margin: 10 }}
                            label="Nombre"
                            variant="filled" />
                    </div>
                    <div className="row">
                        <TextField
                            onChange={this.onChangeMail}
                            style={{ margin: 10 }}
                            multiline
                            label="Mail"
                            variant="filled" />
                    </div>
                    <div className="row">
                        <TextField
                            onChange={this.onChangeMensaje}
                            style={{ margin: 10 }}
                            multiline
                            rows={3}
                            label="Mensaje"
                            variant="filled" />
                    </div>
                    {this.state.cargando === false &&
                            <Button
                                style={{ margin: 10 }}
                                variant="contained"
                                color="primary"
                                onClick={this.enviarMensaje}>
                                <p className="textoBoton">
                                    ENVIAR
                        </p>
                            </Button>
                        }
                    </>
    }
                        {this.state.cargando === true &&
                            <BeatLoader
                                size={30}
                                color={"#123abc"}
                            />
                        }
                        {this.state.enviado &&
                            <div className="divGracias">
                                <img className="iconoAsistireDestacado" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592178375/garrapata_2_sdbmuy.png"></img>
                                <p className="mensajeGracias">
                                    Gracias por comunicarte con nosotros. Te responderemos a tu mail a la brevedad.
                                </p>
                            </div>
                        }
                    </div>
                </div>
        )
    }
}

export default Contacto;