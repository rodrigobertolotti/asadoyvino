import React from 'react';
import './Contacto.css';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { Form, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

class Contacto extends React.Component {

    state = {
        nombre: '',
        mail: '',
        mensaje: '',
        enviado: false,
        cargando: false,
        width: 0,
        height: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            width: 0, height: 0, enviado: false,
            nombre: '',
            mail: '',
            mensaje: '',
            enviado: false,
            cargando: false,
            width: 0,
            height: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
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
            <div className="fondoContacto" style={{ height: this.state.height }}>
                <div className="columnContacto">
                    {this.state.enviado === false &&
                        <div>
                            <div className="rowContacto">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control
                                            type="text"
                                            onChange={this.onChangeNombre}
                                            placeholder="Nombre" />
                                    </Form.Group>
                                </Form.Row>
                            </div>
                            <div className="rowContacto">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control
                                            type="text"
                                            onChange={this.onChangeMail}
                                            placeholder="Mail" />
                                    </Form.Group>
                                </Form.Row>
                            </div>
                            <div className="rowContacto">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control
                                            onChange={this.onChangeMensaje}
                                            type="text"
                                            as="textarea"
                                            rows="3"
                                            placeholder="Dejanos tu mensaje." />
                                    </Form.Group>
                                </Form.Row>
                            </div>
                            {this.state.cargando === false &&
                                <Button
                                    style={{ marginTop: 20 }}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.enviarMensaje}>
                                    <p className="textoBoton">
                                        ENVIAR
                        </p>
                                </Button>

                            }
                        </div>
                    }
                    <div>
                        {this.state.cargando === true &&
                            <BeatLoader
                                style={{ margin: 20 }}
                                size={30}
                                color={"#123abc"}
                            />
                        }
                    </div>
                    <div>
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
            </div>
        )
    }
}

export default Contacto;