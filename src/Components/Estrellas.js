import React from 'react';
import '../Estilos/Estrellas.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Estilos/Estrellas.css';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { connect } from 'react-redux';
import { guardarOpinionEstrellas } from '../Redux/OpinionesReducer/OpinionesActions';

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
        actualizo: false
    } 

    componentDidMount(){
        let estrellasNuevas = [];
        const cantEstrellas= this.encontrarEstrellas();
        for (var i = 0; i < cantEstrellas; i++) {
            estrellasNuevas.push("https://res.cloudinary.com/dyvyiepbv/image/upload/v1590447939/rock-and-roll_f4axis.png");
        }
        for (var i = 0; i < 5 - cantEstrellas; i++) {
            estrellasNuevas.push("https://res.cloudinary.com/dyvyiepbv/image/upload/v1590448224/rock-and-roll_1_owavnr.png");
        }
        this.setState({
            estiloEstrellas: estrellasNuevas
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
            cantidad: parseInt(e.target.id) +1
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
    }

    encontrarEstrellas = () => {
        for (var i=0; i<this.props.cantidadEstrellas.length; i++){
            if (this.props.cantidadEstrellas[i].id===this.props.idToque){
                return this.props.cantidadEstrellas[i].cantidad;
            }
        }
        return 0;

    }

    

    render() {
        const estrellas = [];
        for (var i = 0; i < 5; i++) {
            estrellas.push(
                <img
                    id={i}
                    alt=""
                    onMouseOver={this.evaluarVoto}
                    onMouseOut={this.limpiarSeleccion}
                    onClick={this.votar}
                    className="iconoRockGrande"
                    src={this.state.estiloEstrellas[i]}/>
            )
        }
        return (
            <div className="divOpinar">
                <div class="comentarios">
                    <TextField variant="outlined" onChange={this.onChangeUsuario} style={{ width: '90%' }} id="standard-basic" label="Nombre" />
                    <div className="espacio"></div>
                    <TextField
                     multiline  
                     rows={2}
                     variant="outlined"
                     onChange={this.onChangeComentario} 
                     style={{ width: '90%' }} 
                     label="Comentarios" />
                </div>
                <Container style={{ textAlign: 'center', marginTop: 25 }}>
                    <div class="estrellas">
                        {estrellas}
                    </div>
                </Container>
                <Container style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px' }}>
                    <div className="espacio"></div>
                    <Button onClick={() => this.props.agregarToque(this.state.usuario, this.state.cantidad, this.state.comentario)} color="primary" variant="contained">
                        <p className="textoBoton">AGREGAR</p>
                    </Button>
                </Container>
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