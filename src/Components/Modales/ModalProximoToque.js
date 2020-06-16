import React from 'react';
import Modal from 'react-modal';
import ProximoToque from '../ProximoToque';
import ComunidadToque from '../ComunidadToque';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class ModalProximoToque extends React.Component {

    state = {
        tabValue: 0
    }
    componentDidMount() {
        this.setState({
            tabValue: 0
        })
    }


    cambiarTab = () => {
        let nuevoValor = 0;
        if (this.state.tabValue === 0) {
            nuevoValor = 1
        }
        this.setState({
            tabValue: nuevoValor
        })
    }

    render() {
        const tamanoPantalla = window.screen.width;
        let customStyles = {
            content: {
                top: '10%',
                left: '50%',
                right: 'auto',
                bottom: '10%',
                marginRight: '-50%',
                width: '50%',
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
                    bottom: '5%',
                    marginRight: '-50%',
                    height: '95%',
                    width: '90%',
                    transform: 'translate(-40%, 0)',
                },
            }
        }
        return (
            <Modal isOpen={this.props.openModal} ariaHideApp={false} style={customStyles}>
                <div className="row" style={{ paddingBottom: 20, borderBottom: "thin solid" }}>
                    <div className="columna3">
                        <p className="subtituloChico">{this.props.toqueSeleccionado.nombre}</p>
                        <img className="iconoSocial"
                         src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1592188084/instagram-bosquejado_v9ezxx.png"></img>
                    </div>
                    <div className="columna1">
                        <div className="alineoDerecha">
                            <i class="far fa-2x fa-times-circle" onClick={this.props.cerrarModal}></i>
                        </div>
                    </div>
                </div>
                <Paper square>
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.cambiarTab}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label={<span className="textoLabel">Informacion</span>} />
                        <Tab label={<span className="textoLabel">Comunidad</span>} />
                    </Tabs>
                </Paper>
                {this.state.tabValue === 0 &&
                    <ProximoToque
                        toque={this.props.toqueSeleccionado}
                    ></ProximoToque>
                }
                {this.state.tabValue ===1 && 
                    <ComunidadToque></ComunidadToque>
                }
            </Modal>
        )
    }
}

export default ModalProximoToque;