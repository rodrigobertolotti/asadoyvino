import React from 'react';
import Countdown from './Countdown';
import axios from 'axios';
import './Destacado.css';
import ClipLoader from "react-spinners/ClipLoader";

class Destacado extends React.Component {

    state = {
        toque: [],
        loading: false
    }

    componentDidMount(){
        this.setState({
            loading: true
        })
        axios.get('https://voyalagua.com/asadoyvino/api/TraerToqueConMasAsistentes.php')
        .then(response => {
            this.setState({
                toque: response.data.data[0],
                loading: false
            })
        })
    }
    render() {

        return (
            <div className="destacadosDiv">
                <div className="row">
                    {this.state.loading===true ? 
                        <div className="columna3">
                            <center>
                            <ClipLoader
                            size={100}
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
                        src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1588785600/logo_uel9ec.png" 
                        ></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Destacado;