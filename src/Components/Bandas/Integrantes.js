import React from 'react';
import axios from 'axios';

class Integrantes extends React.Component {

    state = {
        integrantes: []
    }

    constructor(props) {
        super(props);
        this.setState({
            integrantes: []
        })
    }

    componentDidMount() {
        axios.get("http://localhost:8080/asadoyvinoAPI/api/TraerIntegrantesBanda.php?idBanda=" + this.props.idBanda)
            .then((response) => {
                console.log(response.data.data);
                this.setState({
                    integrantes: response.data.data
                })
            })
    }
    devuelvoInstrumento = (instrumento) => {
        switch (instrumento) {
            case 'Voz':
                return "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588788946/instrument_koz2pk.png";
            case "Guitarra":
                return "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588789371/electric-guitar_mwgznk.png";
            case "Bateria":
                return "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588789371/drum-set_u0vywg.png";
            case "Teclado":
                return "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588789371/synthesizer_avx3lf.png";
            case "Trompeta":
                return "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588788946/orchestra_zj76az.png";
            case "Saxo":
                return "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588788946/wind_n9w6oy.png";
            case "Acustica":
                return "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588788946/instrument_koz2pk.png";
            default:
                return "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588788946/instrument_koz2pk.png";
        }
    }
    render() {
        return (
            <div className="integrantesDiv">
                <p className="subtituloBanda">Integrantes</p>
                <div className="integrantes">
                    {this.state.integrantes.map((integrante) => (
                        <div className="integrantesItem">
                            <img className="disco" src={this.devuelvoInstrumento(integrante.instrumento)}></img>
                            <p className="descripcion">{integrante.nombre}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Integrantes;