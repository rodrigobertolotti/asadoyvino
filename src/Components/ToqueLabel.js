import React from 'react';
import '../Estilos/ToqueLabelStyle.css';

export default function ToqueLabel(props) {
    let fecha = props.toque.fecha;
    let fechaSplitArray = fecha.split("-");
    let nuevaFecha = fechaSplitArray[2] + "/" + fechaSplitArray[1];
    let diff = ((Date.parse(new Date(props.toque.fecha)) + props.toque.hora/86400) - Date.parse(new Date()));
    switch(Math.floor(diff / 86400)){
        case -1:
            nuevaFecha="HOY";
        break;
        case 1:
            nuevaFecha="MAÑANA"; 
        break;
        case 2:
            nuevaFecha="FALTAN 2 DIAS";
        break;
        default:
            nuevaFecha= diaSemana(new Date(props.toque.fecha));
        break;
    }
    nuevaFecha= diaSemana(new Date(props.toque.fecha));
    let estiloCantidadAsistentes="cantidadAsistentesNegro";
    if (localStorage.getItem(props.toque.id)==="1"){
        estiloCantidadAsistentes="cantidadAsistentesVerde";
    }

    return (
        <div className="labelProximos">
            <div className="column4">
                <div className="row">
                    <p className="nombreToque">{props.toque.nombre}
                    {localStorage.getItem(props.toque.id)==="1" && <img className="tickAsisitire" src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592178375/garrapata_3_gc82ss.png"></img>}
                    </p>
                </div>
                <div className="row">
                    <p className="fechaHora">{nuevaFecha} - <strong>{props.toque.hora}hs</strong></p>
                </div>
                <div className="row">
                    <p className="lugar">{props.toque.lugar}</p>
                </div>
            </div>
            <div className="column2">
                {props.toque.linkImagen.length>3 ?
                <img className="miniaturaImagen" src={props.toque.linkImagen}></img>
                :
                <img className="miniaturaImagen" src="https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,w_157/v1593011894/LogoA_cuadrado_odqerz.png"></img>
                }
            </div>
        </div>
    )
}

function diaSemana(fecha){
    let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado","Domingo"];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let fechaNum = fecha.getUTCDate();
    let mes_name = fecha.getMonth();
	return dias[fecha.getDay()] + " " + fechaNum + " de " + meses[mes_name];
}