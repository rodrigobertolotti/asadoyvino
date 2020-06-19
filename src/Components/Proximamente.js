import React from 'react';

class Proximamente extends React.Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <div className="fondoProximamente" style={{height: this.state.height}}>
                <p className="textoProximamente">
                    PROXIMAMENTE
            </p>
            </div>
        )
    }
}

export default Proximamente;