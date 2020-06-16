import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import 'date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TheatersIcon from '@material-ui/icons/Theaters';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import UploadImage from './UploadImage';
import '../Estilos/AgregarToque.css';

class AgregarToque extends React.Component {

    state = {
        nombre: "",
        lugar: "",
        fecha: "10-10-2010",
        hora: "21:00",
        precioEntradas: "",
        ventaEntradas: "",
        descripcion: "",
        cantidadAsistentes: "",
        linkImagen: "",
        departamento: "",
        tamano: "",
        validoEnvio: false
    }

    agregarToque = () => {
        axios.post('https://desafinando.com/asadoyvino/api/AgregarToque.php', {
            "nombre": this.state.nombre,
            "lugar": this.state.lugar,
            "fecha": this.state.fecha,
            "hora": this.state.hora,
            "precioEntradas": this.state.precioEntradas,
            "ventaEntradas": this.state.ventaEntradas,
            "descripcion": this.state.descripcion,
            "cantidadAsistentes": 0,
            "tamano": this.state.tamano,
            "finalizado": "0",
            "departamento": this.state.departamento,
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

    handleChangeFecha = (e) => (
        this.setState({
            fecha: e.target.value
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

    handleChangeHora = (e) => (
        this.setState({
            hora: e.target.value
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

    onChangeSelect = (e) => {
        this.setState({
            departamento: e.target.value
        })
    }

    onChangeSelectTamano = (e) => {
        this.setState({
            tamano: e.target.value
        })
    }

    verificoDatos = () => {
        const valido= this.state.nombre!==""
         && this.state.fecha!=="" 
         && this.state.departamento!=="" 
         && this.state.lugar!=="";
        this.setState({
            validoEnvio: valido
        })
    }

    render() {
        const listaDepartamentos = ["Canelones", "Maldonado", "San Jose"];
        const tamanoToques = ["Bar/Restaurante", "Solista", "Toque de banda", "Festival"];
        return (
            <div>
                <div className="rowAgregar">
                    <div className="columnAgregar">
                        <TextField
                            onChange={this.handleChangeNombre}
                            style={{ fontSize: 12, width: '90%' }}
                            label="Bandas" />
                        <div className="espacio"></div>
                        <FormControl  style={{ fontSize: 12,width: '90%' }}>
                        <InputLabel>Departamento</InputLabel>
                            <Select onChange={this.onChangeSelect}>
                                <MenuItem value="Montevideo">Montevideo</MenuItem>
                                {listaDepartamentos.map((departamento) => (
                                    <MenuItem value={departamento}>{departamento}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="espacio"></div>
                        <TextField
                            disableToolbar
                            margin="normal"
                            type="date"
                            label="Fecha"
                            style={{ fontSize: 12,width: '90%' }}
                            value={this.state.fecha}
                            onChange={this.handleChangeFecha.bind(this)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <div className="espacio"></div>
                        <TextField
                            onChange={this.handleChangePrecioEntrada}
                            style={{ fontSize: 12,width: '90%' }}
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
                            style={{ fontSize: 12,width: '90%' }}
                            label="Lugar"
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
                        <FormControl
                            style={{ fontSize: 12,width: '90%' }}>
                            <InputLabel>Tipo de toque</InputLabel>
                            <Select
                                label="Tipo de toque"
                                onChange={this.onChangeSelectTamano}>
                                {tamanoToques.map((opcion) => (
                                    <MenuItem value={opcion}>{opcion}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="espacio"></div>
                        <TextField
                            margin="normal"
                            style={{ fontSize: 12,width: '90%' }}
                            id="time-picker"
                            label="Hora"
                            type="time"
                            value={this.state.hora}
                            onChange={this.handleChangeHora}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        <div className="espacio"></div>
                        <TextField
                            onChange={this.handleChangeDondeCompro}
                            style={{ fontSize: 12,width: '90%' }}
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
                    style={{ fontSize: 12,width: '95%' }}
                    multiline
                    rows={2}
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