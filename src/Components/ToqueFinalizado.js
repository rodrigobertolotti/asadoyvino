import React from 'react';
import ListaComentarios from './ListaComentarios';
import Estrellas from './Estrellas';
import '../Estilos/ToqueOpinion.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class ToqueFinalizado extends React.Component {


    state = {
        opiniones: [],
        algo: true,
        loadingComments: false,
        muestroComentarios: true,
        tabValue: 0, 
        cantidadComentarios: 0
    }

    componentDidMount() {
        this.setState({
            loadingComments: true
        })
        let idToque = this.props.idToque;
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
            "numeroToque": this.props.idToque,
            "nombreUsuario": usuario,
            "estrellas": cantidad,
            "comentario": comentario
        })
            .then(function (response) {
                console.log("Agregado correctamente");
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
        let textoLabelOpiniones= "VER OPINIONES (" + this.state.cantidadComentarios + ")";
        return (
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
                            <Estrellas agregarToque={this.agregarOpinionToque} idToque={this.props.idToque}></Estrellas>
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
        )
    }
}

export default ToqueFinalizado;