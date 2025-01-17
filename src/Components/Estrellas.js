import React from 'react';
import '../Estilos/Estrellas.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Estilos/Estrellas.css';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { guardarOpinionEstrellas } from '../Redux/OpinionesReducer/OpinionesActions';
import BeatLoader from "react-spinners/BeatLoader";
import { Form, Col } from 'react-bootstrap';

class Estrellas extends React.Component {

    state = {
        voto: false,
        estiloEstrellas: ['https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png',
            'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png',
            'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png',
            'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png',
            'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png'],
        cantidad: 0,
        comentario: "",
        usuario: "",
        actualizo: false,
        loading: this.props.loading, 
    }

    componentDidMount() {
        let estrellasNuevas = [];
        const cantEstrellas = this.encontrarEstrellas();
        for (var i = 0; i < cantEstrellas; i++) {
            estrellasNuevas.push("https://res.cloudinary.com/dyvyiepbv/image/upload/v1590447939/rock-and-roll_f4axis.png");
        }
        for (var i = 0; i < 5 - cantEstrellas; i++) {
            estrellasNuevas.push("https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png");
        }
        this.setState({
            estiloEstrellas: estrellasNuevas,
            loading: this.props.loading,
            comentarioRealizado: false,
        })
    }

    evaluarVoto = (e) => {
        let seleccionada = (parseInt(e.target.id) + 1);
        let estrellasNuevas = [];
        for (var i = 0; i < seleccionada; i++) {
            estrellasNuevas.push("https://res.cloudinary.com/dyvyiepbv/image/upload/v1590447939/rock-and-roll_f4axis.png");
        }
        for (var i = 0; i < 5 - seleccionada; i++) {
            estrellasNuevas.push("https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png");
        }
        this.setState({
            estiloEstrellas: estrellasNuevas
        })
    }

    limpiarSeleccion = () => {
        if (this.state.voto === false) {
            this.setState({
                estiloEstrellas: ['https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png',
                    'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png',
                    'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png',
                    'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png',
                    'https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png'],
            })
        }
    }

    votar = (e) => {
        this.setState({
            voto: true,
            cantidad: parseInt(e.target.id) + 1,
        })


    }

    onChangeComentario = (e) => {
        this.setState({
            comentario: e.target.value
        })
    }

    onChangeUsuario = (e) => {
        this.setState({
            usuario: e.target.value
        })
    }

    agregarOpinion = () => {
        const puntuacion = {
            "id": this.props.idToque,
            "cantidad": this.state.cantidad
        }
        this.props.asignarPuntaje(puntuacion);
        this.setState({
            comentario: "",
            usuario: ""
        })
    }

    encontrarEstrellas = () => {
        for (var i = 0; i < this.props.cantidadEstrellas.length; i++) {
            if (this.props.cantidadEstrellas[i].id === this.props.idToque) {
                return this.props.cantidadEstrellas[i].cantidad;
            }
        }
        return 0;
    }



    render() {
        const estrellas = [];
        let muestroAgregado = this.props.comentarioRealizado === true && this.props.loading === false;
        for (var i = 0; i < 5; i++) {
            estrellas.push(
                <img
                    id={i}
                    alt=""
                    onMouseOver={this.evaluarVoto}
                    onMouseOut={this.limpiarSeleccion}
                    onClick={this.votar}
                    className="iconoRockGrande"
                    src={this.state.estiloEstrellas[i]} />
            )
        }

        return (
            <div className="divOpinar">
                <div class="comentarios">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                onChange={this.onChangeUsuario}
                                type="text"
                                placeholder="Nombre" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Comentarios:</Form.Label>
                            <Form.Control
                                onChange={this.onChangeComentario}
                                value={this.state.comentario}

                                type="text"
                                as="textarea"
                                rows="4"
                                placeholder="Opina sobre la banda, evento u organización, publica articulos perdidos o cualquier otro comentario respecto al toque. " />
                        </Form.Group>
                    </Form.Row>
                    <center><span className="puntuaToque">Puntuación:</span></center>
                    <Container style={{ textAlign: 'center', marginTop: 25 }}>
                        <div class="estrellas">
                            {estrellas}
                        </div>
                    </Container>
                    <Container style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px' }}>
                        <div className="espacio"></div>
                        {this.props.loading === true ?
                            <div>
                                <div className="espacio"></div>
                                <div className="centrado">
                                    <BeatLoader
                                    style={{marginTop: 30}}
                                        size={30}
                                        color={"#123abc"}
                                    />
                                </div>
                            </div>
                            :
                            <Button disabled={this.state.usuario.length === 0 || this.props.enviado===true} onClick={() => this.props.agregarToque(this.state.usuario, this.state.cantidad, this.state.comentario)} color="primary" variant="contained">
                                <p className="textoBoton">AGREGAR</p>
                            </Button>
                        }
                        {muestroAgregado === true &&
                            <center><span className="agregadoExito">Opinion agregada exitosamente</span></center>
                        }
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cantidadEstrellas: state.opiniones.cantidadEstrellas
})

const mapDispatchToProps = (dispatch) => ({
    asignarPuntaje: (cantidad) => dispatch(guardarOpinionEstrellas(cantidad))
})

export default connect(mapStateToProps, mapDispatchToProps)(Estrellas);