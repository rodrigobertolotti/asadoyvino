import React from 'react';
import '../Estilos/ToqueLabelStyle.css';

export default function ToqueLabel(props) {
    let fecha = props.toque.fecha;
    let fechaSplitArray = fecha.split("-");
    let nuevaFecha = fechaSplitArray[2] + "/" + fechaSplitArray[1];
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
    let estiloCantidadAsistentes="cantidadAsistentesNegro";
    if (localStorage.getItem(props.toque.id)==="1"){
        estiloCantidadAsistentes="cantidadAsistentesVerde";
    }
    
    return (
        <div className="labelProximos">
            <div className="column4">
                <div className="row">
                    <p className="nombreToque">{props.toque.nombre.substring(0,20)} <img className="iconoCantidadUsuarios" alt="" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1590787713/grupo_1_ypbnce.png"></img>
                    <span className={estiloCantidadAsistentes}>{props.toque.cantidadAsistentes}</span>
                    {localStorage.getItem(props.toque.id)==="1" && <img className="tickAsisitire" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592178375/garrapata_3_gc82ss.png"></img>}
                    </p>
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
