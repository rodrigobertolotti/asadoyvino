import React from 'react';
import ToqueOpinion from './ToqueOpinion';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../Estilos/Principal.css';
import ModalToqueFinalizado from '../Components/Modales/ModalToqueFinalizado';
import axios from 'axios';

class ListaToquesOpinion extends React.Component {

    state = {
        openModal: false,
        toqueSeleccionado: '',
        toques: [],
        noHayToques: false
    }


    componentDidMount = () => {
        axios.get('https://desafinando.com/asadoyvino/api/TraerToquesFinalizados.php')
            .then((response) => {
                this.setState({
                    toques: response.data.data
                })
            })
            .catch(
                this.setState({
                    noHayToques: true
                })
            );
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
        axios.get('https://desafinando.com/asadoyvino/api/TraerToquesFinalizados.php')
            .then((response) => {
                this.setState({
                    toques: response.data.data,
                })
            })
            .catch((error) => console.log(error));
        document.body.style.overflow = '';
    }


    render() {
        return (
            <>
                <div className="listaToquesDivOpiniones">
                    <center><span className="textoFiltrar">FINALIZADOS</span></center>
                    <div className="listContainerTerminados">
                        <>
                        <List>
                            {
                                this.state.toques.map((toque) => (
                                    <ListItem
                                        key={toque.id}
                                        onHover={() => this.cambiarEstilo()}
                                        onClick={() => this.detallesRecital(toque)}>
                                        <ToqueOpinion toque={toque}></ToqueOpinion>
                                    </ListItem>
                                ))
                            }
                        </List>
                        <ModalToqueFinalizado
                            toque={this.state.toqueSeleccionado}
                            cerrarModal={() => this.cerrarModal()}
                            isOpen={this.state.openModal}
                        ></ModalToqueFinalizado>
                        </>
                    </div>
                </div>
            </>
        )
    }
}

export default ListaToquesOpinion;