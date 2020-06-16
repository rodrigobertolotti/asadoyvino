import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Contacto.css';

class Contacto extends React.Component {

    render() {
        return (
            <div className="fondo">
                <div className="column">
                    <div className="row">
                        <p className="textoContacto">Contactate con nosotros</p>
                    </div>
                    <div className="row">
                        <TextField
                            multiline
                            style={{ margin: 10 }}
                            label="Nombre"
                            variant="filled" />
                    </div>
                    <div className="row">
                        <TextField
                            style={{ margin: 10 }}
                            multiline
                            label="Mail"
                            variant="filled" />
                    </div>
                    <div className="row">
                        <TextField
                            style={{ margin: 10 }}
                            multiline
                            rows={3}
                            label="Mensaje"
                            variant="filled" />
                    </div>
                    <div className="row">
                        <Button
                            style={{ margin: 10 }}
                            variant="contained"
                            color="primary"
                            onClick={this.sumarAsistente}>
                            <p className="textoBoton">
                                ENVIAR
                        </p>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contacto;