import React from 'react';
import Modal from 'react-modal';
import ProximoToque from '../ProximoToque';

class ModalProximoToque extends React.Component{

    render(){
        const tamanoPantalla = window.screen.width;
        let customStyles = {
            content: {
                top: '10%',
                left: '50%',
                right: 'auto',
                bottom: '10%',
                marginRight: '-50%',
                width: '30%',
                height: '80%',
                transform: 'translate(-40%, -10%)',
            },
        }
        if (tamanoPantalla < 600) {
            customStyles = {
                content: {
                    top: '0%',
                    left: '40%',
                    right: 'auto',  
                    bottom: '0%',
                    marginRight: '-50%',
                    height: '100%',
                    width: '90%',
                    transform: 'translate(-40%, 0)',
                },
            }
        }
        return(
            <Modal isOpen={this.props.openModal} ariaHideApp={false} style={customStyles}>
            <div className="row" style={{paddingBottom: 20 ,borderBottom: "thin solid"}}>
                <div className="columna3">
                    <p className="subtituloChico">{this.props.toqueSeleccionado.nombre}</p>
                </div>
                <div className="columna1">
                    <div className="alineoDerecha">
                        <i class="far fa-2x fa-times-circle" onClick={this.props.cerrarModal}></i>
                    </div>
                </div>
            </div>
            <ProximoToque
                toque={this.props.toqueSeleccionado}
            ></ProximoToque>
        </Modal>
        )
    }
}

export default ModalProximoToque;