import React from 'react';
import ToqueOpinion from './ToqueOpinion';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../Estilos/Principal.css';
import Modal from 'react-modal';
import ToqueFinalizado from './ToqueFinalizado';
import axios from 'axios';

class ListaToquesOpinion extends React.Component {

    state = {
        openModal: false,
        toqueSeleccionado: '',
        toques: []
    }
    
    
    componentDidMount = () => {
        axios.get('https://telonero.com/asadoyvino/api/TraerToquesFinalizados.php')
        .then((response) => {
            this.setState({
                toques: response.data.data
            })
        })
        .catch((error) => console.log(error));
    }

    detallesRecital = (toque) => {

        this.setState({
            openModal: true,
            toqueSeleccionado: toque
        })
        document.body.style.overflow = 'hidden';
    }

    cerrarModal = () => {
        this.setState({
            openModal: false
        })
        axios.get('https://telonero.com/asadoyvino/api/TraerToquesFinalizados.php')
        .then((response) => {
            this.setState({
                toques: response.data.data,
            })
        })
        .catch((error) => console.log(error));
        document.body.style.overflow = '';
    }


    render() {

    
        const tamanoPantalla = window.screen.width;
        let customStyles = {
            content: {
                top: '15%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                width: '60%',
                transform: 'translate(-40%, -10%)',
            },
        }
        if (tamanoPantalla < 600) {
             customStyles = {
                content: {
                    top: '0%',
                    left: '40%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    width: '80%',
                    transform: 'translate(-40%, 0)',
                },
            }
        }
        return (
            <>
                <div className="listaToquesDivOpiniones">
                    <center><p className="titulo">OPINIONES</p></center>
                    <div className="listContainer">
                        <List>
                            {
                                this.state.toques.map((toque) => (
                                    <ListItem key = {toque.id} onHover={() => this.cambiarEstilo()} onClick={() => this.detallesRecital(toque)}>
                                        <ToqueOpinion toque={toque}></ToqueOpinion>
                                    </ListItem>
                                ))
                            }
                        </List>
                        <Modal isOpen={this.state.openModal}
                            style={customStyles}
                        >
                            <div className="row">
                                <div className="columna3">
                                    <p className="subtituloChico">{this.state.toqueSeleccionado.nombre} en {this.state.toqueSeleccionado.lugar}</p>
                                </div>
                                <div className="column">
                                    <div className="alineoDerecha">
                                        <i class="far fa-2x fa-times-circle" onClick={this.cerrarModal}></i>
                                    </div>
                                </div>
                            </div>
                            <ToqueFinalizado
                                idToque={this.state.toqueSeleccionado.id}
                            ></ToqueFinalizado>
                        </Modal>
                    </div>
                </div>
            </>
        )
    }
}

export default ListaToquesOpinion;