import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MiniaturaBanda from './MiniaturaBanda';
import '../../Estilos/Buscador.css';
import Banda from './Banda';
import axios from 'axios';
import { Switch, Route, Link, Redirect } from "react-router-dom";

class Buscador extends React.Component {

    state = {
        busco: false,
        banda: "",
        bandas: [],
        discosBanda: [],
        cargando: false
    }

    componentDidMount() {
        this.setState({
            cargando: true
        })
        axios.get("http://localhost:8080/asadoyvinoAPI/api/TraerBandas.php")
            .then(response => {
                this.setState({
                    bandas: response.data.data,
                    cargando: false
                })
            })
        let idBanda = window.location.href.split("/bandas")[1];
        if (idBanda.length > 0) {
            idBanda= idBanda.substring(1);
            axios.get("http://localhost:8080/asadoyvinoAPI/api/TraerUnaBanda.php?idBanda=" + idBanda)
                .then((response) => {
                    this.setState({
                        busco: true,
                        banda: response.data.data[0]
                    })
                })
            axios.get("http://localhost:8080/asadoyvinoAPI/api/TraerDiscosBanda.php?idBanda=" + idBanda)
                .then((response) => {
                    this.setState({
                        busco: true,
                        discosBanda: response.data.data,
                        cargando: false
                    })
                })
        }
    }


    mostrarBanda = () => {
        this.setState({
            cargando: true
        })
        const idBanda = window.location.href.split("bandas/")[1];
        axios.get("http://localhost:8080/asadoyvinoAPI/api/TraerUnaBanda.php?idBanda=" + idBanda)
            .then((response) => {
                this.setState({
                    busco: true,
                    banda: response.data.data[0]
                })
            })
        axios.get("http://localhost:8080/asadoyvinoAPI/api/TraerDiscosBanda.php?idBanda=" + idBanda)
            .then((response) => {
                this.setState({
                    busco: true,
                    discosBanda: response.data.data,
                    cargando: false
                })
            })
    }

    render() {
        const flexContainer = {
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
        };
        return (
            <div>
                <div className="buscadorBandas">
                    <List style={flexContainer}>
                        {this.state.bandas.map((banda) => (
                            <ListItem key={banda.id} onClick={() => this.mostrarBanda(banda.id)}>
                                <Link to={'/bandas/' + banda.id}>
                                    <MiniaturaBanda nombreBanda={banda.nombre} logoBanda={banda.logo}></MiniaturaBanda>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </div>
                {this.state.busco && <Banda cargando={this.state.cargando} banda={this.state.banda} discosBanda={this.state.discosBanda}></Banda>}
            </div >
        )
    }
}

export default Buscador;