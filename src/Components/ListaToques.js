import React from 'react';
import ToqueLabel from './ToqueLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../Estilos/Principal.css';
import Button from '@material-ui/core/Button';
import ModalAgregarToque from '../Components/Modales/ModalAgregarToque';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import '../constantes';
import ModalProximoToque from '../Components/Modales/ModalProximoToque.js';

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
        if (this.state.departamento === "Todos") {
            axios.get('https://telonero.com/asadoyvino/api/TraerToques.php')
                .then((response) => {
                    this.setState({
                        toques: response.data.data,
                    })
                })
        } else {
            axios.get('https://telonero.com/asadoyvino/api/TraerToquesDepartamento.php?departamento=' + this.state.departamento)
                .then((response) => {
                    if (response.length > 0) {
                        this.setState({
                            toques: response.data.data,
                        })
                    }
                })
        }
        document.body.style.overflow = '';
    }

    abrirAgregarToque = () => {
        this.setState({
            modalAgregarToque: true
        })
    }

    cerrarAgregarToque = () => {
        this.setState({
            modalAgregarToque: false
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
                    top: '10%',
                    left: '40%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    width: '80%',
                    transform: 'translate(-40%, 0)',
                },
            }
        }
        const tamanoToques = ["Bar/Restaurante", "Solista", "Toque de banda", "Festival"];

        return (
            <>
                <div className="listaToquesDiv">
                    <center><p className="titulo">CRONOGRAMA</p></center>
                    <center><span className="textoFiltrar">BUSCAR TOQUES</span></center>
                    <div className="select">
                        <FormControl variant="filled" className="selectDepartamento" style={{margin: 5}}>
                            <InputLabel className="selectDepartamento">Departamento</InputLabel>
                            <Select onChange={this.onChangeSelect}>
                                <MenuItem value="Todos">Todos</MenuItem>
                                {this.state.listaDepartamentos.map((departamento) => (
                                    <MenuItem value={departamento.departamento}>{departamento.departamento}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" className="selectDepartamento" style={{margin: 5}}>
                            <InputLabel className="selectDepartamento">Tipo de toque</InputLabel>
                            <Select>
                                <MenuItem value="Todos">Todos</MenuItem>
                                {tamanoToques.map((opcion) => (
                                    <MenuItem value={opcion}>{opcion}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <ModalProximoToque
                        openModal={this.state.openModal}
                        toqueSeleccionado={this.state.toqueSeleccionado}
                        cerrarModal={() => this.cerrarModal()}
                    ></ModalProximoToque>
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
                    </div>
                    <div className="divBoton">
                        <Button onClick={this.abrirAgregarToque} variant="contained" color="primary">
                            <p className="textoBoton">AGREGAR</p>
                        </Button>
                    </div>
                    <ModalAgregarToque
                        openModal={this.state.modalAgregarToque}
                        cerrarModal={() => this.cerrarAgregarToque()}
                        estilo={customStyles}></ModalAgregarToque>
                </div>
            </>
        )
    }
}


export default ListaToques;