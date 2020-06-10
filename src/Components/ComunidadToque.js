import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import AnadirComunidad from '../Components/Comunidad/AnadirComunidad';
import CompartirViaje from '../Components/Comunidad/CompartirViaje';
import Entradas from '../Components/Comunidad/Entradas';
import Comentarios from '../Components/Comunidad/Comentarios';

class ComunidadToque extends React.Component{
    
    state={
        tabValue: 0,
        anadir: true,
        compartirViaje: false,
        entradas: false,
        comentarios: false
    }

    abroAgregar = () => {
        this.setState({
            tabValue: 0,
            anadir: true,
            compartirViaje: false,
            entradas: false,
            comentarios: false
        })
    }

    abroCompartirViaje = () => {
        this.setState({
            tabValue: 1,
            anadir: false,
            compartirViaje: true,
            entradas: false,
            comentarios: false
        })
    }

    abroComentarios = () => {
        this.setState({
            tabValue: 2,
            anadir: false,
            compartirViaje: false,
            entradas: false,
            comentarios: true
        })
    }

    abroEntradas = () => {
        this.setState({
            tabValue: 3,
            anadir: false,
            compartirViaje: false,
            entradas: true,
            comentarios: false
        })
    }

    render() {
        const widthModifier = {
            maxWidth: `40px`,
          };

        return (
            <>
            <Paper  square>
            <Tabs
                value={this.state.tabValue}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab style={widthModifier} onClick={this.abroAgregar} label={<Avatar src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591815439/anadir_j5wygy.png"></Avatar>} />
                <Tab style={widthModifier} onClick={this.abroCompartirViaje} label={<Avatar src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/transporte_d84leg.png"></Avatar>} />
                <Tab style={widthModifier} onClick={this.abroComentarios} label={<Avatar src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/libro_jf3no2.png"></Avatar>} />
                <Tab style={widthModifier} onClick={this.abroEntradas} label={<Avatar src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/boleto_bhauxy.png"></Avatar>} />
            </Tabs>
        </Paper>
        {this.state.anadir===true && <AnadirComunidad></AnadirComunidad>}
        {this.state.compartirViaje===true && <CompartirViaje></CompartirViaje>}
        {this.state.entradas===true && <Entradas></Entradas>}
        {this.state.comentarios===true && <Comentarios></Comentarios>}
        </>
        )
    }
}

export default ComunidadToque;
