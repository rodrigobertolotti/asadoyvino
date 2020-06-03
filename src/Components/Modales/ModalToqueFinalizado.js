import React from 'react';
import ListaComentarios from '../ListaComentarios';
import Estrellas from '../Estrellas';
import '../../Estilos/ToqueOpinion.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
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
        comentarioRealizado: false
    }

    componentDidMount() {
        console.log("Id toque: " + this.props.toque);
        this.setState({
            loadingComments: true
        })
        let idToque = this.props.toque.id;
        axios.get('https://telonero.com/asadoyvino/api/TraerComentariosDeToque.php?idToque=' + idToque + '')
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
        axios.get('https://telonero.com/asadoyvino/api/TraerComentariosDeToque.php?idToque=' + idToque + '')
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
        axios.post('https://telonero.com/asadoyvino/api/AgregarOpinionToque.php', {
            "numeroToque": this.props.toque.id,
            "nombreUsuario": usuario,
            "estrellas": cantidad,
            "comentario": comentario
        })
            .then(function (response) {
                this.setState({
                    comentarioRealizado: true
                })
            })
            .catch(function (error) {
                console.log(error);
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
            opiniones: invertido
        })



    }

    render() {
            
        const tamanoPantalla = window.screen.width;
        let customStyles = {
            content: {
                top: '10%',
                left: '50%',
                right: 'auto',
                bottom: '10%',
                marginRight: '-50%',
                width: '60%',
                height: '80%',
                transform: 'translate(-40%, -10%)',
            },
        }
        if (tamanoPantalla < 600) {
             customStyles = {
                content: {
                    top: '5%',
                    left: '40%',
                    right: 'auto',  
                    bottom: '5%',
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
                <div className="columna3">
                    <p className="subtituloChico">{this.props.toque.nombre} en {this.props.toque.lugar}</p>
                </div>
                <div className="column">
                    <div className="alineoDerecha">
                        <i class="far fa-2x fa-times-circle" onClick={this.props.cerrarModal}></i>
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
                            <Estrellas comentarioRealizado={this.state.comentarioRealizado} agregarToque={this.agregarOpinionToque} idToque={this.props.idToque}></Estrellas>
                        </div>
                        :
                        <div className="columnToqueOpinion">
                            <div className="row">
                                {this.state.loadingComments === true ?
                                    <center>
                                        <ClipLoader
                                            size={100}
                                            color={"#123abc"}
                                            loading={this.state.loading}
                                        />
                                    </center>
                                    :
                                    <ListaComentarios opiniones={this.state.opiniones}></ListaComentarios>
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