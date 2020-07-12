import React from 'react';
import './ConocerBanda.css';

class ConocerBanda extends React.Component {

    render() {
        return (
            <div className="column">
                <p className="tituloBanda">{this.props.banda.nombre}</p>
                <div className="divYoutube"> 
                    <center>
                    {(this.props.banda.youtube.length > 2) === true &&
                    <iframe width="300"
                     height="169" 
                     src={this.props.banda.youtube}
                     frameborder="0" 
                     allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                     allowfullscreen></iframe>
                    }
                        <p>{this.props.banda.descripcion}</p>
                    </center>
                </div>
                {(this.props.banda.nombre === 'No tenemos datos de esta banda') === false &&
                <div className="column">
                    <span className="conocerRedes">Seguir a {this.props.banda.nombre} en redes </span>
                    <div className="row">
                        <div>
                            <a href={this.props.banda.instagram}>
                                <img className="iconoSocial" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1593818621/instagram-bosquejado_2_kdbyqa.png"></img>
                            </a>
                        </div>
                        <div>
                            <a href={this.props.banda.facebook}>
                                <img className="iconoSocial" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1593818621/facebook_2_mtnbvu.png"></img>
                            </a>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default ConocerBanda;