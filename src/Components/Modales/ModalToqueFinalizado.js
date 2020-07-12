import React from 'react';
import ListaComentarios from '../ListaComentarios';
import Estrellas from '../Estrellas';
import '../../Estilos/ToqueOpinion.css';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from 'react-modal';

class ModalToqueFinalizado extends React.Component {


    state = {
        opiniones: [],
        algo: true,
        loadingComments: false,
        muestroComentarios: true,
        tabValue: 0, 
        cantidadComentarios: 0,
        comentarioRealizado: false,
        loadingAgregarComentario: false,
        estrellas: 0,
        cantEstrellas: 0, 
        enviado: false
    }

    componentDidMount() {
        this.setState({
            loadingComments: true
        })
        let idToque = this.props.toque.id;
        axios.get('https://desafinando.com/asadoyvino/api/TraerComentariosDeToque.php?idToque=' + idToque + '')
            .then((response) => {
                try {
                    let cantidadComentarios = response.data.data.length;
                    let listaOpiniones = [];
                    for (var i = 0; i < cantidadComentarios; i++) {
                        let opinionUsuario = [];
                        opinionUsuario.push(response.data.data[i].nombreUsuario);
                        opinionUsuario.push(response.data.data[i].comentario);
                        opinionUsuario.push(response.data.data[i].estrellas);
                        opinionUsuario.push(response.data.data[i].fecha);
                        listaOpiniones.push(opinionUsuario);
                    }
                    this.setState({
                        opiniones: listaOpiniones,
                        loadingComments: false, 
                        cantidadComentarios: cantidadComentarios
                    })
                } catch (e) {

                }
            })
        
    }

    componentDidUpdate() {
        let idToque = this.props.toque.id;
        axios.get('https://desafinando.com/asadoyvino/api/TraerComentariosDeToque.php?idToque=' + idToque + '')
            .then((response) => {
                try {
                    let cantidadComentarios = response.data.data.length;
                    let listaOpiniones = [];
                    for (var i = 0; i < cantidadComentarios; i++) {
                        let opinionUsuario = [];
                        opinionUsuario.push(response.data.data[i].nombreUsuario);
                        opinionUsuario.push(response.data.data[i].comentario);
                        opinionUsuario.push(response.data.data[i].estrellas);
                        opinionUsuario.push(response.data.data[i].fecha);
                        listaOpiniones.push(opinionUsuario);
                    }
                    this.setState({
                        opiniones: listaOpiniones,
                        loadingComments: false, 
                        cantidadComentarios: cantidadComentarios
                    })
                } catch (e) {

                }
            })
    }

    cambiarTab = () => {
        let nuevoValor=0;
        if (this.state.tabValue===0){
            nuevoValor=1
        }
        this.setState({
            muestroComentarios: !this.state.muestroComentarios,
            tabValue: nuevoValor
        })
    }

    agregarOpinionToque = (usuario, cantidad, comentario) => {
        this.setState({
            loadingAgregarComentario: true
        })
        axios.post('https://desafinando.com/asadoyvino/api/AgregarOpinionToque.php', {
            "numeroToque": this.props.toque.id,
            "nombreUsuario": usuario,
            "estrellas": cantidad,
            "comentario": comentario
        })
            .then(() => {
                this.setState({
                    comentarioRealizado: true,
                    loadingAgregarComentario: false, 
                    enviado: true
                })
            })
            .catch(function (error) {
                console.log(error + "error");
            });

        //agrego comentario a estado
        let nuevoComentario = [];
        nuevoComentario.push(usuario);
        nuevoComentario.push(comentario);
        nuevoComentario.push(cantidad);
        let comentariosActual = this.state.opiniones;
        comentariosActual.push(nuevoComentario);
        let invertido = [];
        for (var i = comentariosActual.length - 1; i > -1; i--) {
            invertido.push(comentariosActual[i])
        }
        this.setState({
            opiniones: invertido, 
            comentarioRealizado: true,
            enviado: true
        })
    }

    render() {        
        const tamanoPantalla = window.screen.width;
        let customStyles = {
            content: {
                top: '12%',
                left: '50%',
                right: 'auto',
                bottom: '0%',
                borderRadius: '10px',
                marginRight: '-50%',
                width: '50%',
                height: '90%',
                transform: 'translate(-40%, -10%)',
            },
        }
        if (tamanoPantalla < 600) {
             customStyles = {
                content: {
                    top: '5%',
                    left: '40%',
                    right: 'auto',  
                    bottom: '0%',
                    borderRadius: '10px',
                    marginRight: '-50%',
                    height: '90%',
                    width: '90%',
                    transform: 'translate(-40%, 0)',
                },
            }
        }
        let textoLabelOpiniones= "VER OPINIONES (" + this.state.cantidadComentarios + ")";
        return (
            <Modal isOpen={this.props.isOpen}
            style={customStyles}
            >
            <div className="row" style={{paddingBottom: 20 ,borderBottom: "thin solid"}}>
                <div className="row">
                <p className="subtituloChico">{this.props.toque.nombre}</p>
                </div>
                <div className="column">
                    <div className="alineoDerecha">
                        <i class="fa fa-2x fa-times" onClick={this.props.cerrarModal}></i>
                    </div>
                </div>
            </div>
            <div className="column">
                <Paper square   >
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.cambiarTab}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label={<span className="textoLabel">Opinar</span>}/>
                        <Tab label={<span className="textoLabel">{textoLabelOpiniones}</span>} />
                    </Tabs>
                </Paper>
                <div className="row">
                    {this.state.muestroComentarios ?
                        <div className="columnToqueOpinion">
                            <Estrellas 
                            enviado={this.state.enviado}
                            comentarioRealizado={this.state.comentarioRealizado} 
                            agregarToque={this.agregarOpinionToque} 
                            idToque={this.props.idToque}
                            loading={this.state.loadingAgregarComentario}
                            ></Estrellas>
                        </div>
                        :
                        <div className="columnToqueOpinion">
                            <div className="row">
                                {this.state.loadingComments === true ?
                                    <center>
                                        <BeatLoader
                                            size={50}
                                            color={"#123abc"}
                                            loading={this.state.loading}
                                        />
                                    </center>
                                    :
                                    <ListaComentarios cantidadEstrellas={this.state.cantEstrellas} 
                                    opiniones={this.state.opiniones}>
                                    </ListaComentarios>
                                }
                                {
                                    this.state.cantidadComentario === 0 && <h1>No hay comentarios para este toque</h1>
                                }

                            </div>
                        </div>
                    }
                </div>
            </div>
            </Modal>
        )
    }
}

export default ModalToqueFinalizado;