import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';

class AgregarBanda extends React.Component {

    state = {
        nombre: "",
        descripcion: "",
        facebook: "",
        instagram: "",
        youtube: ""
        }

        agregarBanda = () => {
            axios.post('https://desafinando.com/asadoyvino/api/AgregarBanda.php',{
                "nombre": this.state.nombre,
                "descripcion": this.state.descripcion,
                "instagram": this.state.instagram,
                "facebook": this.state.facebook,
                "youtube": this.state.youtube
            }).then((response) => {
                alert("Banda agregada correctamente")
            })
        }
        onChangeNombre = (e) => {
            this.setState({
                nombre: e.target.value
            })
        }

        onChangeDescripcion = (e) => {
            this.setState({
                descripcion: e.target.value
            })
        }

        onChangeFacebook = (e) => {
            this.setState({
                facebook: e.target.value
            })
        }

        onChangeInstagram = (e) => {
            this.setState({
                instagram: e.target.value
            })
        }

        onChangeYoutube = (e) => {
            this.setState({
                youtube: e.target.value
            })
        }

    render() {
        return (
            <div><h1>Agregar banda</h1>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            onChange={this.onChangeNombre}
                            placeholder="Nombre">
                        </Form.Control>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            onChange={this.onChangeDescripcion}
                            placeholder="Descripcion">
                        </Form.Control>
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control
                            onChange={this.onChangeFacebook}
                            placeholder="Facebook">
                        </Form.Control>
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control
                            onChange={this.onChangeInstagram}
                            placeholder="Instagram">
                        </Form.Control>
                        <Form.Label>Youtube</Form.Label>
                        <Form.Control
                            onChange={this.onChangeYoutube}
                            placeholder="Youtube">
                        </Form.Control>
                        <Button onClick={this.agregarBanda}>ENVIAR</Button>
                    </Form.Group>

                </Form.Row>
            </div>
        )
    }
}

export default AgregarBanda;