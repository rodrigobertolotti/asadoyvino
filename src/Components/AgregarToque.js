import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TheatersIcon from '@material-ui/icons/Theaters';
import UploadImage from './UploadImage';
import '../Estilos/AgregarToque.css';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

class AgregarToque extends React.Component {

    state = {
        nombre: "",
        lugar: "",
        fecha: "2017-05-24",
        hora: "21:00",
        precioEntradas: "",
        ventaEntradas: "",
        descripcion: "",
        cantidadAsistentes: "",
        linkImagen: ""
    }

    agregarToque = () => {
        let fechaActual = new Date(this.state.fecha);
        let fecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
        let hora = fechaActual.getHours() + ":" + fechaActual.getMinutes();
        axios.post('https://telonero.com/asadoyvino/api/AgregarToque.php', {
            "nombre": this.state.nombre,
            "lugar": this.state.lugar,
            "fecha": fecha,
            "hora": hora,
            "precioEntradas": this.state.precioEntradas,
            "ventaEntradas": this.state.ventaEntradas,
            "descripcion": this.state.descripcion,
            "cantidadAsistentes": 0,
            "tamano": "1",
            "finalizado": "0",
            "departamento": "Montevideo",
            "linkImagen": this.state.linkImagen
        })
            .then(function (response) {
                console.log("Agregado correctamente");
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.onClick();
    }

    handleChangeNombre = (e) => {
        this.setState({
            nombre: e.target.value
        })
    }

    handleChangeFecha = (date) => (
        this.setState({
            fecha: date
        })
    )

    handleChangeLugar = (e) => {
        this.setState({
            lugar: e.target.value
        })
    }

    handleChangePrecioEntrada = (e) => {
        this.setState({
            precioEntradas: e.target.value
        })
    }

    handleChangeDondeCompro = (e) => {
        this.setState({
            ventaEntradas: e.target.value
        })
    }

    handleChangeHora = (date) => (
        this.setState({
            hora: date
        })
    )

    handleChangeDescripcion = (e) => (
        this.setState({
            descripcion: e.target.value
        })
    )

    capturoLinkImagen = (link) => {
        this.setState({
            linkImagen: link
        })
    }

    render() {
        return (
            <div>
                <div className="rowAgregar">
                    <div className="columnAgregar">
                        <TextField
                            onChange={this.handleChangeNombre}
                            style={{ width: '90%' }}
                            variant="filled"
                            label="Bandas" />
                        <div className="espacio"></div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="filled"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Fecha"
                                onChange={this.handleChangeFecha}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <div className="espacio"></div>
                        <TextField
                            onChange={this.handleChangePrecioEntrada}
                            style={{ width: '90%' }}
                            variant="filled"
                            label="Precio entradas"
                            inputProps={{
                                maxLength: 4,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AttachMoneyIcon />
                                    </InputAdornment>
                                ),
                            }} />
                    </div>
                    <div className="columnAgregar">
                        <TextField
                            onChange={this.handleChangeLugar}
                            style={{ width: '90%' }}
                            label="Lugar"
                            variant="filled"
                            inputProps={{
                                maxLength: 30,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="espacio"></div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                variant="filled"
                                margin="normal"
                                id="time-picker"
                                label="Hora"
                                onChange={this.handleChangeHora}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <div className="espacio"></div>
                        <TextField
                            onChange={this.handleChangeDondeCompro}
                            style={{ width: '90%' }}
                            variant="filled"
                            inputProps={{
                                maxLength: 30,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TheatersIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="Lugares de venta?" />
                    </div>
                </div>
                <div className="espacio"></div>
                <TextField
                    style={{ width: '95%' }}
                    variant="filled"
                    onChange={this.handleChangeDescripcion}
                    label="Descripcion" />
                    <div className="espacio"></div>
                <UploadImage capturo={(e) => this.capturoLinkImagen(e)}></UploadImage>
                <Container style={{ textAlign: 'center', margin: '20px' }}>
                    <Button color="primary" onClick={this.agregarToque} variant="contained">
                        <p className="textoBoton">AGREGAR</p>
                    </Button>
                </Container>
            </div>

        )
    }
}

export default AgregarToque;