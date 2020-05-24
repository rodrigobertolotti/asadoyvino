import React from 'react';
import ListaComentarios from './ListaComentarios';
import Estrellas from './Estrellas';
import '../Estilos/ToqueOpinion.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";


class ToqueFinalizado extends React.Component {

    
    state= {
        opiniones: [],
        algo: true,
        loadingComments: false
    }

    componentDidMount(){
        this.setState({
            loadingComments: true
        })
        let idToque= this.props.idToque;
        axios.get('https://voyalagua.com/asadoyvino/api/TraerComentariosDeToque.php?idToque='+idToque+'')
        .then((response) => {
            try{
            let cantidadComentarios=response.data.data.length;
            let listaOpiniones=[];
            for (var i=0; i<cantidadComentarios; i++){
                let opinionUsuario=[];
                opinionUsuario.push(response.data.data[i].nombreUsuario);
                opinionUsuario.push(response.data.data[i].comentario);
                opinionUsuario.push(response.data.data[i].estrellas);
                listaOpiniones.push(opinionUsuario);
            }
            this.setState({
                opiniones: listaOpiniones,
                loadingComments: false

            })
        }catch(e){
            
        }
        })
    }

    agregarOpinionToque = (usuario, cantidad, comentario) => {
        axios.post('https://voyalagua.com/asadoyvino/api/AgregarOpinionToque.php', {
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
        let nuevoComentario= [];
        nuevoComentario.push(usuario);
        nuevoComentario.push(comentario);
        nuevoComentario.push(cantidad);
        let comentariosActual= this.state.opiniones;
        comentariosActual.push(nuevoComentario);
        let invertido=[];
        for (var i=comentariosActual.length-1; i>-1; i--){
            invertido.push(comentariosActual[i])
        }
        this.setState({
            opiniones: invertido
        })



    }

    render() {
        return (
            <div className="row">
                <div className="columnToqueOpinion">
                    <Estrellas agregarToque={this.agregarOpinionToque} idToque={this.props.idToque}></Estrellas>
                </div>
                <div className="columnToqueOpinion">
                    <div className="row">
                        {this.state.loadingComments===true ? 
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
            </div>
        )
    }
}

export default ToqueFinalizado;