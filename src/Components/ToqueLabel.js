import React from 'react';
import '../Estilos/ToqueLabelStyle.css';

export default function ToqueLabel(props) {
    let fecha = props.toque.fecha;
    let fechaSplitArray = fecha.split("-");
    let nuevaFecha = fechaSplitArray[2] + "/" + fechaSplitArray[1];
    let imagen = "";
    switch (props.toque.tamano) {
        case '1':
            imagen = "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588792633/guitar-player_lo0viz.png";
            break;
        case '2':
            imagen = "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588792634/stage_sgu5vp.png";
            break;
        case '3':
            imagen = "https://res.cloudinary.com/dyvyiepbv/image/upload/v1588792629/concert_g04geh.png";
            break;
        default:
            break;
    }
    let cuantoFalta="";
    let diff = (Date.parse(new Date(props.toque.fecha)) - Date.parse(new Date())) / 1000;
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
        break;
    }

    return (
        <div className="labelProximos" >
            <div className="column4">
                <div className="row">
                    <p className="nombreToque">{props.toque.nombre.substring(0,20)} <img className="iconoCantidadUsuarios" alt="" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1590787713/grupo_1_ypbnce.png"></img><span className="cantidadAsistentes">{props.toque.cantidadAsistentes}</span></p>
                </div>
                <div className="row">
                    <p className="fechaHora">{nuevaFecha} - <strong>{props.toque.hora}hs</strong></p>
                </div>
                <div className="row">
                    <p className="lugar">{props.toque.lugar} - {props.toque.departamento}</p>
                </div>
            </div>
        </div>
    )
}

/*            <div className="columna1">
                <div className="rowCentrado">
                    <div className="rowCentrado">
                        <div class="img-with-text">
                        <img src={imagen}
                            className="iconoToque"
                            alt="sometext"
                            ></img>
                        </div>
                    </div>
                </div>*/
