import React from 'react';
import MiniaturaDisco from './MiniaturaDisco';
import './Bandas.css';

class Discos extends React.Component {

    render() {

        return (
            <>
            <p className="subtituloBanda">Albums</p>
                <div className="discos">
                            {this.props.discos.map((disco) => (
                                <MiniaturaDisco disco={disco}></MiniaturaDisco>
                            ))}
                </div>
                </>
        )
    }
}

export default Discos;