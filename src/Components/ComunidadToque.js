import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';

class ComunidadToque extends React.Component{
    
    state={
        tabValue: 0
    }

    abroCompartirViaje = () => {
        this.setState({
            tabValue: 0
        })
    }

    abroComentarios = () => {
        this.setState({
            tabValue: 1
        })
    }

    abroEntradas = () => {
        this.setState({
            tabValue: 2
        })
    }

    render() {
        const widthModifier = {
            maxWidth: `40px`,
          };

        return (
            <Paper  square>
            <Tabs
                value={this.state.tabValue}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab style={widthModifier} onClick={this.abroCompartirViaje} label={<Avatar src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/transporte_d84leg.png"></Avatar>} />
                <Tab style={widthModifier} onClick={this.abroComentarios} label={<Avatar src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/libro_jf3no2.png"></Avatar>} />
                <Tab style={widthModifier} onClick={this.abroEntradas} label={<Avatar src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1591716115/boleto_bhauxy.png"></Avatar>} />

            </Tabs>
        </Paper>
        )
    }
}

export default ComunidadToque;
