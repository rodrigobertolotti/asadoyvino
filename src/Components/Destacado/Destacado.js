import React from 'react';
import Countdown from './Countdown';
import axios from 'axios';
import './Destacado.css';
import ClipLoader from "react-spinners/ClipLoader";

class Destacado extends React.Component {

    state = {
        toque: [],
        loading: false,
        fecha: ""
    }

    componentDidMount(){
        this.setState({
            loading: true
        })
        axios.get('https://telonero.com/asadoyvino/api/TraerToqueConMasAsistentes.php')
        .then(response => {
            let fecha = response.data.data[0].fecha;
            let fechaSplitArray = fecha.split("-");
            let nuevaFecha = fechaSplitArray[2] + "/" + fechaSplitArray[1];
            this.setState({
                toque: response.data.data[0],
                loading: false, 
                fecha: nuevaFecha
            })
        })
    }
    render() {
        let nuevaFecha="";
        let diff = (Date.parse(new Date(this.state.toque.fecha)) - Date.parse(new Date())) / 1000;
        switch(Math.floor(diff / 86400)){
            case 0:
                nuevaFecha="HOY";
            break;
            case 1:
                nuevaFecha="MAÑANA"; 
            break;
            case 2:
                nuevaFecha="2 DIAS";
            break;
            default:
                nuevaFecha=this.state.fecha
            break;
        }
        return (
            <div className="destacadosDiv">
                <img className="estrellaDestacado" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1590790129/estrellas_cygndi.png"></img>
                <div className="row">
                    {this.state.loading===true ? 
                        <div className="columna3">
                            <center>
                            <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.loading}
                          />
                          </center>
                          </div>
                        :
                        <div className="columna3">
                        <p className="nombreToquePrincipal">{this.state.toque.nombre}</p>
                        <Countdown fecha={this.state.toque.fecha}></Countdown>
                    </div>
    }
                    <div className="columna1">
                        <img 
                        className="logoDestacado"
                        alt=""
                        src={this.state.toque.linkImagen} 
                        ></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Destacado;