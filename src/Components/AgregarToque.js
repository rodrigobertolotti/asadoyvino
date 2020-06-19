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
        tamano: "@",
        validoEnvio: false, 
        loading: false
    }

    agregarToque = () => {
        this.setState({
            loading: true
        })
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
                this.setState({
                    loading: false
                })
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

    render() {
        const listaDepartamentos = ["Canelones", "Maldonado", "San Jose"];
        return (
            <div>
                {this.state.loading===true && <h1>Cargando...</h1>}
                {this.state.loading===false && 
                <>
                <div className="rowAgregar">
                    <div className="columnAgregar">
                        <TextField
                            required
                            onChange={this.handleChangeNombre}
                            style={{ fontSize: 12, width: '90%' }}
                            label="Bandas" />
                        <div className="espacio"></div>
                        <FormControl 
                         style={{ fontSize: 12,width: '90%' , marginTop:15}}>
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
                            required
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
                            required
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
                        <TextField
                            margin="normal"
                            style={{ fontSize: 9,width: '90%' }}
                            label="Instagram"
                            onChange={this.onChangeSelectTamano}
                        />
                        <div className="espacio"></div>
                        <TextField
                            margin="normal"
                            style={{ fontSize: 12,width: '90%' }}
                            id="time-picker"
                            label="Hora"
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
                            label="Puntos de venta" />
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
                    <Button 
                    color="primary" 
                    onClick={this.agregarToque} 
                    disabled={this.state.nombre.length<4  && this.state.lugar.length<4}
                    variant="contained">
                        <p className="textoBoton">AGREGAR</p>
                    </Button>
                </Container>
                </>
                 }
           </div>

        )
    }
}

export default AgregarToque;