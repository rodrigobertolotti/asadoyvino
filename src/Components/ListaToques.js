import React from 'react';
import ToqueLabel from './ToqueLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../Estilos/Principal.css';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import ProximoToque from './ProximoToque';
import ModalAgregarToque from './ModalAgregarToque';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import '../constantes';

class ListaToques extends React.Component {

    state = {
        openModal: false,
        toqueSeleccionado: '',
        modalAgregarToque: false,
        toques: [],
        departamento: "Todos",
        listaDepartamentos: []
    }

    componentDidMount = () => {
        //Departamentos con toques
        axios.get('https://telonero.com/asadoyvino/api/TraerDepartamentosConToques.php')
        .then((response) => {
            this.setState({
                listaDepartamentos: response.data.data,
                openModal: false
            })
            console.log(response.data.data);
        })
        if (this.state.departamento === "Todos") {
            axios.get('https://telonero.com/asadoyvino/api/TraerToques.php')
                .then((response) => {
                    this.setState({
                        toques: response.data.data
                    })
                })
        }
    }
    detallesRecital = (toque) => {
        console.log(toque);
        this.setState({
            openModal: true,
            toqueSeleccionado: toque
        })
        document.body.style.overflow = 'hidden';
    }

    cerrarModal = () => {
        if (this.state.departamento === "Todos") {
            axios.get('https://telonero.com/asadoyvino/api/TraerToques.php')
                .then((response) => {
                    this.setState({
                        toques: response.data.data,
                        openModal: false
                    })
                })
        } else {
            axios.get('https://telonero.com/asadoyvino/api/TraerToquesDepartamento.php?departamento=' + this.state.departamento)
                .then((response) => {
                    if (response.length > 0) {
                        this.setState({
                            toques: response.data.data,
                            openModal: false
                        })
                    }
                })
        }
        document.body.style.overflow = '';
    }

    agregarToque = () => {
        this.setState({
            modalAgregarToque: true
        })
    }

    onChangeSelect = (e) => {
        this.setState({ departamento: e.target.value }, function () {
            if (this.state.departamento === "Todos") {
                axios.get('https://telonero.com/asadoyvino/api/TraerToques.php')
                    .then((response) => {
                        this.setState({
                            toques: response.data.data
                        })
                    })
            } else {
                axios.get('https://telonero.com/asadoyvino/api/TraerToquesDepartamento.php?departamento=' + this.state.departamento)
                    .then((response) => {
                        console.log(response);
                        this.setState({
                            toques: response.data.data
                        })
                    })
            }
        })
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
                width: '30%',
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
                <div className="listaToquesDiv">
                    <center><p className="titulo">CRONOGRAMA</p></center>
                    <div className="select">
                        <FormControl variant="filled" className="selectDepartamento">
                            <InputLabel className="selectDepartamento">Departamento</InputLabel>
                            <Select onChange={this.onChangeSelect}>
                                <MenuItem value="Todos">Todos</MenuItem>
                                {this.state.listaDepartamentos.map((departamento) => (
                                     <MenuItem value={departamento.departamento}>{departamento.departamento}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="listContainer">
                        <List>
                            {
                                this.state.toques.map((toque) => (
                                    <ListItem onClick={() => this.detallesRecital(toque)}>
                                        <ToqueLabel toque={toque}>
                                        </ToqueLabel>
                                    </ListItem>
                                ))
                            }
                        </List>
                        <Modal isOpen={this.state.openModal} ariaHideApp={false}style={customStyles}>
                            <div className="row">
                                <div className="columna3">
                                    <p className="tituloToque">{this.state.toqueSeleccionado.nombre}</p>
                                </div>
                                <div className="columna1">
                                    <div className="alineoDerecha">
                                        <i class="far fa-2x fa-times-circle" onClick={this.cerrarModal}></i>
                                    </div>
                                </div>
                            </div>
                            <ProximoToque
                                toque={this.state.toqueSeleccionado}
                            ></ProximoToque>
                        </Modal>
                    </div>
                    <div className="divBoton">
                        <Button onClick={this.agregarToque} variant="contained" color="primary">
                            <p className="textoBoton">AGREGAR</p>
                        </Button>
                    </div>
                    {this.state.modalAgregarToque && <ModalAgregarToque estilo={customStyles}></ModalAgregarToque>}
                </div>
            </>
        )
    }
}


export default ListaToques;