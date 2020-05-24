import React from 'react';
import '../Estilos/ToqueLabelStyle.css';

export default function ToqueLabel(props) {
    let fecha = props.toque.fecha;
    let fechaSplitArray = fecha.split("-");
    let nuevaFecha = fechaSplitArray[2] + "/" + fechaSplitArray[1] + "/" + fechaSplitArray[0];
    let imagen = "";
    let extraUbic="";
    if (props.toque.lugar.length > 9){
        extraUbic="..";
    }
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
            cuantoFalta="HOY";
        break;
        case 1:
            cuantoFalta="MAÑANA"; 
        break;
        case 2:
            cuantoFalta="2 DIAS";
        break;
        default:
            cuantoFalta="";
        break;
    }

    return (
        <div className="labelProximos">
            <div className="columna3">
                <div>
                    <div className="row">
                        <p className="nombreToque">{props.toque.nombre} <span className="cantidadAsistentes">{props.toque.cantidadAsistentes} <i class="fas fa-check"></i> </span><span className="cuantoFalta">{cuantoFalta}</span></p>
                    </div>
                </div>
            </div>
            <div className="columna1">
                <div className="rowCentrado">
                    <div className="rowCentrado">
                        <div class="img-with-text">
                        <img src={imagen}
                            className="iconoToque"
                            alt="sometext"
                            ></img>
                        <p className="detalleUbicacionToque">{props.toque.lugar.substring(0,10)}{extraUbic}</p>
                        </div>
                    </div>
                </div>
                <div className="caracteristicas">
                    <div className="inline">
                        <i class="far fa-calendar-alt iconoUbicacion"></i><p className="ubicacionToque">{nuevaFecha}</p>
                    </div>
                    <div className="inline">
                        <i class="far fa-clock iconoUbicacion"></i><p className="ubicacionToque">{props.toque.hora}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
