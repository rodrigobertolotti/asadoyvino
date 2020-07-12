import React from 'react';
import Modal from 'react-modal';
import ProximoToque from '../ProximoToque';
import ConocerBanda from '../ConcerBanda/ConocerBanda';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';

class ModalProximoToque extends React.Component {

    state = {
        tabValue: 0,
        banda: []
    }

    componentDidMount(){
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
                borderRadius: '10px',
                marginRight: '-50%',
                width: '50%',
                height: '90%',
                transform: 'translate(-40%, -10%)',
            },
        }
        if (tamanoPantalla < 600) {
            customStyles = {
                content: {
                    top: '5%',
                    left: '40%',
                    right: 'auto',
                    bottom: '5%',
                    borderRadius: '15px',
                    marginRight: '-50%',
                    height: '90%',
                    width: '90%',
                    transform: 'translate(-40%, 0)',
                },
            }
        }
        return (
            <Modal isOpen={this.props.openModal} ariaHideApp={false} style={customStyles}>
                <div className="row" style={{ paddingBottom: 20, borderBottom: "thin solid" }}>
                    <p className="subtituloChico">{this.props.toqueSeleccionado.nombre}</p>
                    <div className="columna1">
                        <div className="alineoDerecha">
                            <i class="fa fa-2x fa-times" onClick={this.props.cerrarModal}></i>
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
                        <Tab label={<span className="textoLabel">Info del toque</span>} />
                        <Tab label={<span className="textoLabel">Conocer banda</span>} />
                    </Tabs>
                </Paper>
                {this.state.tabValue === 0 &&
                    <ProximoToque
                        toque={this.props.toqueSeleccionado}
                    ></ProximoToque>
                }
                {this.state.tabValue === 1 &&
                    <ConocerBanda banda={this.props.banda}></ConocerBanda>
                }
            </Modal>
        )
    }
}

export default ModalProximoToque;