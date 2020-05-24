import React from 'react';

class MiniaturaDisco extends React.Component {

    render() {
        return (
            <>
                <div className="campoTablaDisco">
                    <img className="disco" src={this.props.disco.imagen}></img>
                    <p className="descripcion">{this.props.disco.nombre}</p>
                    <p className="descripcionAno">{this.props.disco.ano}</p>
                </div>
                    
            </>
        )
    }
}

export default MiniaturaDisco;