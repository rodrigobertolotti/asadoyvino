import React from 'react';
import ToqueLabel from './ToqueLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../Estilos/Principal.css';
import axios from 'axios';
import '../constantes';
import ModalProximoToque from '../Components/Modales/ModalProximoToque.js';
import { Form } from 'react-bootstrap';


class ListaToques extends React.Component {

    state = {
        openModal: false,
        toqueSeleccionado: '',
        modalAgregarToque: false,
        toques: [],
        departamento: "Todos",
        listaDepartamentos: [],
        textoDeptosSelect: "Departamento",
        textoTamanoSelect: "Tipo de toque",
        banda: []
    }

    componentDidMount = () => {
        //Departamentos con toques
        axios.get('https://desafinando.com/asadoyvino/api/TraerDepartamentosConToques.php')
            .then((response) => {
                this.setState({
                    listaDepartamentos: response.data.data,
                    openModal: false
                })
                console.log(response.data.data);
            })
        if (this.state.departamento === "Todos") {
            axios.get('https://desafinando.com/asadoyvino/api/TraerToques.php')
                .then((response) => {
                    this.setState({
                        toques: response.data.data
                    })
                })
        }
    }

    detallesRecital = (toque) => {
        axios.get('https://desafinando.com/asadoyvino/api/TraerUnaBanda.php?idBanda=' + toque.idBanda)
            .then(response => {
                this.setState({
                    banda: response.data.data[0],
                    openModal: true,
                    toqueSeleccionado: toque,
                    textoDeptosSelect: "",
                    textoTamanoSelect: ""
                })
            })
            .catch(() => {
                let bandaError= {
                    nombre: "No tenemos datos de esta banda",
                    descripcion: "",
                    facebook: "",
                    instagram: "",
                    youtube: ""
                }
                this.setState({
                    banda: bandaError,
                    openModal: true,
                    toqueSeleccionado: toque,
                    textoDeptosSelect: "",
                    textoTamanoSelect: ""
                })
            })
        document.body.style.overflow = 'hidden';
    }

    cerrarModal = () => {
        this.setState({
            openModal: false,
            textoDeptosSelect: "Departamento",
            textoTamanoSelect: "Tipo de toque"
        })
        if (this.state.departamento === "Todos") {
            axios.get('https://desafinando.com/asadoyvino/api/TraerToques.php')
                .then((response) => {
                    this.setState({
                        toques: response.data.data,
                    })
                })
        } else {
            axios.get('https://desafinando.com/asadoyvino/api/TraerToquesDepartamento.php?departamento=' + this.state.departamento)
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
            modalAgregarToque: true,
            textoDeptosSelect: "",
            textoTamanoSelect: ""
        })
        document.body.style.overflow = 'hidden';

    }

    cerrarAgregarToque = () => {
        this.setState({
            modalAgregarToque: false,
            textoDeptosSelect: "Departamento"
        })
        document.body.style.overflow = '';

    }

    onChangeSelect = (e) => {
        this.setState({ departamento: e.target.value }, function () {
            if (this.state.departamento === "Todos") {
                axios.get('https://desafinando.com/asadoyvino/api/TraerToques.php')
                    .then((response) => {
                        this.setState({
                            toques: response.data.data
                        })
                    })
            } else {
                axios.get('https://desafinando.com/asadoyvino/api/TraerToquesDepartamento.php?departamento=' + this.state.departamento)
                    .then((response) => {
                        console.log(response);
                        this.setState({
                            toques: response.data.data
                        })
                    })
            }
        })
    }

    focoToque = (e) => {
        e.preventDefault();
        alert("Mouse ARRIBA");
    }
    render() {
        const tamanoPantalla = window.screen.width;
        let customStyles = {
            content: {
                top: '10%',
                left: '50%',
                right: 'auto',
                bottom: '10%',
                height: '80%',
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
                    bottom: '0%',
                    height: '100%',
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
                    <center><span className="textoFiltrar">PRÓXIMOS TOQUES</span></center>
                    <div className="select">
                        <Form.Control
                            onChange={this.onChangeSelect}
                            as="select">
                            {this.state.listaDepartamentos.map((departamento) => (
                                <option value={departamento.departamento}>{departamento.departamento}</option>
                            ))}
                        </Form.Control>
                    </div>
                    <ModalProximoToque
                        openModal={this.state.openModal}
                        toqueSeleccionado={this.state.toqueSeleccionado}
                        cerrarModal={() => this.cerrarModal()}
                        banda={this.state.banda}
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
                </div>
            </>
        )
    }
}


export default ListaToques;