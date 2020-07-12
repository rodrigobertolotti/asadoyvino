import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import 'date-fns';
import UploadImage from './UploadImage';
import './AgregarToque.css';
import { Form, Col, InputGroup } from 'react-bootstrap';

class AgregarToque extends React.Component {

    state = {
        nombre: "",
        lugar: "",
        fecha: "10-10-2020",
        hora: "21:00",
        precioEntradas: "",
        ventaEntradas: "",
        descripcion: "",
        cantidadAsistentes: "",
        linkImagen: "",
        departamento: "Montevideo",
        tamano: "@",
        telefono: "",
        validoEnvio: false,
        loading: false,
        enviado: false,
        cargandoImagen: false,
        habilitoEnvio: false
    }

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            nombre: "",
            lugar: "",
            fecha: "10-10-2010",
            hora: "21:00",
            precioEntradas: "",
            ventaEntradas: "",
            descripcion: "",
            cantidadAsistentes: "",
            linkImagen: "",
            departamento: "Montevideo",
            tamano: "@",
            telefono: "",
            validoEnvio: false,
            loading: false,
            enviado: false,
            cargandoImagen: false,
            habilitoEnvio: false
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

    agregarToque = () => {
        this.setState({
            enviado: true
        })
        axios.post('https://desafinando.com/asadoyvino/api/AgregarToque.php', {
            "nombre": this.state.nombre,
            "lugar": this.state.lugar,
            "fecha": this.state.fecha,
            "hora": this.state.hora,
            "precioEntradas": this.state.precioEntradas,
            "ventaEntradas": this.state.ventaEntradas,
            "descripcion": this.state.descripcion,
            "cantidadAsistentes": 0,
            "tamano": this.state.tamano,
            "finalizado": "0",
            "departamento": this.state.departamento,
            "linkImagen": this.state.linkImagen,
            "telefonoContacto": this.state.telefono
        })
            .then(function () {
                this.setState({
                    loading: false
                })
            })
            .catch(function (error) {

            });
    }

    handleChangeNombre = (e) => {
        this.setState({
            nombre: e.target.value
        })
    }

    handleChangeFecha = (e) => (
        this.setState({
            fecha: e.target.value,
            habilitoEnvio: true
        })
    )

    handleChangeLugar = (e) => {
        this.setState({
            lugar: e.target.value
        })
    }

    handleChangePrecioEntrada = (e) => {
        this.setState({
            precioEntradas: e.target.value
        })
    }

    handleChangeDondeCompro = (e) => {
        this.setState({
            ventaEntradas: e.target.value
        })
    }

    handleChangeHora = (e) => (
        this.setState({
            hora: e.target.value
        })
    )

    handleChangeDescripcion = (e) => (
        this.setState({
            descripcion: e.target.value
        })
    )

    capturoLinkImagen = (link) => {
        this.setState({
            linkImagen: link
        })
    }

    onChangeSelect = (e) => {
        this.setState({
            departamento: e.target.value
        })
    }

    onChangeSelectTamano = (e) => {
        this.setState({
            tamano: e.target.value
        })
    }

    handleChangeTelefono = (e) => {
        this.setState({
            telefono: e.target.value
        })
    }

    cargandoImagen = () => {
        this.setState({
            cargandoImagen:true
        })
    }

    imagenCargada = () => {
        this.setState({
            cargandoImagen: false
        })
    }
    render() {
        const listaDepartamentos = ["Montevideo", "Canelones", "Maldonado", "Rocha", "San Jose", "Treinta y Tres", "Cerro Largo", "Lavalleja", "Tacuarembo", "Rivera", "Salto", "Artigas", "Paysandu", "Rio Negro", "Soriano", "Flores", "Florida", "Colonia", "Durazno",];
        return (
            <div className="fondo" >
                <div style={{height: 20}}></div>
                <center><span className="tituloAgregar">AGREGAR TOQUE</span>
                    <p className="textoAgregarToque">
                        Si sos organizador de un evento o tu banda va a realizar un toque en vivo, podes agregar de forma
                        gratuita el toque al cronograma. Recomendamos detallar lo mas posible los campos pedidos para darle
                        a los usuarios la mayor y mejor informacion sobre el evento.
                        Opcionalmente se puede vincular una cuenta de instagram que sera publicada junto al evento para que los
                        usuarios puedan seguirla.
                </p>
                </center>
                {this.state.loading === false &&
                    <>
                        <center>
                            <div className="fondoFormularioAgregar">
                                {this.state.enviado === true &&
                                    <div className="divGracias">
                                        <img className="iconoAsistireDestacado" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592178375/garrapata_2_sdbmuy.png"></img>
                                        <p className="mensajeGracias">
                                            Evento agregado correctamente. Aparecerá en la lista de toques una vez que los datso hayan sido verificados.
                                            Por cualquier modificación no dudes en contactarte con nosotros en la seccion <a href="">Contacto</a>
                                        </p>
                                    </div>
                                }
                                {this.state.enviado === false && 
                                <>
                                <div className="rowAgregar">
                                    <div className="columnAgregar">
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Evento</Form.Label>
                                                <Form.Control
                                                    required
                                                    onChange={this.handleChangeNombre}
                                                    type="text"
                                                    placeholder="Nombre del evento" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Lugar</Form.Label>
                                                <Form.Control
                                                    required
                                                    onChange={this.handleChangeLugar}
                                                    type="text"
                                                    placeholder="Lugar" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Fecha</Form.Label>
                                                <Form.Control
                                                    required
                                                    onChange={this.handleChangeFecha.bind(this)}
                                                    type="date"
                                                    placeholder="Fecha del evento" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Hora</Form.Label>
                                                <Form.Control
                                                    onChange={this.handleChangeHora}
                                                    type="text"
                                                    placeholder="Hora" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Precio</Form.Label>
                                                <Form.Control
                                                    onChange={this.handleChangePrecioEntrada}
                                                    type="text"
                                                    placeholder="Precio de las entradas" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Puntos de venta</Form.Label>
                                                <Form.Control
                                                    onChange={this.handleChangeDondeCompro}
                                                    type="text"
                                                    placeholder="Puntos de venta" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Departamento</Form.Label>
                                                <Form.Control
                                                    onChange={this.onChangeSelect}
                                                    as="select">
                                                    {listaDepartamentos.map((departamento) => (
                                                        <option value={departamento}>{departamento}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Instagram</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>@</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        onChange={this.onChangeSelectTamano}
                                                        type="text"
                                                        width="90%"
                                                        placeholder="Cuenta de instagram" />
                                                </InputGroup>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Descripcion y detalles del evento</Form.Label>
                                                <Form.Control
                                                    onChange={this.handleChangeDescripcion}
                                                    type="text"
                                                    as="textarea"
                                                    rows="3"
                                                    placeholder="Descripcion y detalles del evento" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Telefono de contacto</Form.Label>
                                                <Form.Control
                                                    onChange={this.handleChangeTelefono}
                                                    type="text"
                                                    as="textarea"
                                                    rows="1"
                                                    placeholder="Telefono" />
                                            </Form.Group>
                                        </Form.Row>
                                    </div>
                                </div>
                                <UploadImage 
                                cargandoImagen={() => this.cargandoImagen()} 
                                imagenCargada={() => this.imagenCargada()}
                                capturo={(e) => this.capturoLinkImagen(e)}></UploadImage>
                                <Container style={{ textAlign: 'center', margin: '20px' }}>
                                    <Button
                                        color="primary"
                                        onClick={this.agregarToque}
                                        style={{ marginBottom: 20 }}
                                        disabled={this.state.nombre.length < 4 
                                            || this.state.lugar.length < 4 
                                            || this.state.cargandoImagen===true
                                            || this.state.habilitoEnvio===false}
                                        variant="contained">
                                        <p className="textoBoton">AGREGAR</p>
                                    </Button>
                                </Container>
                            </>
                            }
                            </div>
                        </center>
                    </>
                }
                <div style={{height: 30}}></div>
            </div>

        )
    }
}

export default AgregarToque;