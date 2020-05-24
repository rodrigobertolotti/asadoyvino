import React from 'react';

export default function Comentarios(props) {
    return (
        <div className="row">
            <p className="comentarios">{props.cantidad} comentarios</p>
        </div>
    )
}