import React from 'react';
import Countdown from './Countdown';
import axios from 'axios';
import './Destacado.css';
import BeatLoader from "react-spinners/BeatLoader";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


class Destacado extends React.Component {

    state = {
        toque: [],
        loading: false,
        fecha: "",
        lugar: "",
        estiloCantidadAsistentes: "cantidadAsistentesNegro",
        cantidadAsistentes: 0,
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        axios.get('https://desafinando.com/asadoyvino/api/TraerToqueConMasAsistentes.php')
            .then(response => {
                let fecha = response.data.data[0].fecha;
                let fechaSplitArray = fecha.split("-");
                let nuevaFecha = fechaSplitArray[2] + "/" + fechaSplitArray[1];
                let nuevoEstilo = "";
                this.setState({
                    toque: response.data.data[0],
                    loading: false,
                    lugar: response.data.data[0].lugar,
                    fecha: nuevaFecha,
                    estiloCantidadAsistentes: nuevoEstilo,
                    cantidadAsistentes: response.data.data[0].cantidadAsistentes,
                    sume: localStorage.getItem(response.data.data[0].id) === '1'
                })

            })
    }


    sumarAsistente = () => {
        this.setState({
            loadingSumar: true,
        })
        axios.post('https://desafinando.com/asadoyvino/api/AgregarAsistente.php', {
            "id": this.state.toque.id
        })
            .then((response) => {
                this.setState((prevState) => {
                    return {
                        cantidadAsistentes: parseInt(prevState.cantidadAsistentes) + 1,
                        sume: true
                    }
                })
            })
            .catch((error) => console.log(error))
        //this.props.confirmoAsistencia(this.props.toque.id);
        localStorage.setItem(this.state.toque.id, 1);
    }


    render() {
        let nuevaFecha = "";
        let diff = (Date.parse(new Date(this.state.toque.fecha)) - Date.parse(new Date())) / 1000;
        switch (Math.floor(diff / 86400)) {
            case 0:
                nuevaFecha = "HOY";
                break;
            case 1:
                nuevaFecha = "MAÑANA";
                break;
            case 2:
                nuevaFecha = "2 DIAS";
                break;
            default:
                nuevaFecha = this.state.fecha
                break;
        }

        return (
            <div className="destacadosDiv">
                {this.state.loading === true ?
                    <div className="columnDestacado">
                        <center>
                            <BeatLoader
                                size={30}
                                color={"#123abc"}
                                loading={this.state.loading}
                            />
                        </center>
                    </div>
                    :
                        <div className="columnDestacado">
                            <div className="rowDestacado2">
                                <p className="nombreToquePrincipal">{this.state.toque.nombre}</p>
                            </div>
                            <div className="rowDestacado">
                                <span className="cantidadAsistentesDestacado">{this.state.lugar}</span>
                            </div>
                            <div className="rowDestacado">
                                <span className="cantidadAsistentesDestacado">{this.state.cantidadAsistentes} ASISITENTES</span>
                            </div>
                            <div className="rowDestacado2">
                            <Countdown fecha={this.state.toque.fecha}></Countdown>
                            </div>
                            <div className="rowDestacado2">
                                {this.state.sume === false ?
                                    <div className="rowDestacado">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{marginTop: 10, marginBottom: 20}}
                                            onClick={this.sumarAsistente}>
                                            <p className="textoBotonDestacado"> VOY</p>
                                        </Button>
                                    </div>
                                    :
                                    <div className="rowDestacado">
                                        <img className="iconoAsistireDestacado" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592178375/garrapata_2_sdbmuy.png"></img>
                                    </div>
                                }
                            </div>
                        </div>
                }
                <div className="columnDestacado">
                    <img
                        className="logoDestacado"
                        alt=""
                        src={this.state.toque.linkImagen}
                    ></img>
                </div>
                <div className="cartelVertical">
                    <p className="textoVertical">
                        DESTACADO
                    </p>
                </div>
            </div>
        )
    }
}

export default Destacado;