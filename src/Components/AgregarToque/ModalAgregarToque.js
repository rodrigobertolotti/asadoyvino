import React from 'react';
import Modal from 'react-modal';
import AgregarToque from '../AgregarToque';
import '../../Estilos/ToqueLabelStyle.css';
import '../../Estilos/AgregadoExistosamente.css';

class ModalAgregarToque extends React.Component {

    state = {
        sigueAbierto: true,
        agregado: false
    }

    cerrarModal = () => {
        this.setState({
            sigueAbierto: false
        })
    }

    agregarToque = () => {
        console.log("toque agregado");
        this.setState({
            agregado: !this.state.agregado
        })
    }
    render() {
        return (
            <Modal isOpen={this.props.openModal} style={this.props.estilo}>
                <div className="row">
                    <div className="columna2">
                        <p className="titulo">Agregar toque</p>
                    </div>
                    <div className="columna1">
                        <div className="alineoDerecha">
                            <i class="far fa-2x fa-times-circle" onClick={this.props.cerrarModal}></i>
                        </div>
                    </div>
                </div>

                {this.state.agregado===false && <AgregarToque onClick={this.agregarToque}></AgregarToque>}
                {this.state.agregado===true && 
                <div className="container">
                        <p class="titulo">BIEN!!!</p>
                        <div className="espacio"></div>
                        <i class="far fa-3x fa-thumbs-up"></i>
                        <div className="espacio"></div>
                        <p class="subtitulo">El toque será publicado en el cronograma luego de que los datos sean verificados. Gracias!</p>
                </div>}
            </Modal>
        )
    }
}

export default ModalAgregarToque;