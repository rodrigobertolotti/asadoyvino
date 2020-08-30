import React from 'react';
import AgregarBanda from './AgregarBanda';
import axios from 'axios';
import { Table } from 'react-bootstrap';
class Add extends React.Component {

    state = {
        toques: [],
        bandas: [],
        idBandaSeleccionada: 0,
        ok: false
    }

    componentDidMount = () => {
        axios.get('https://desafinando.com/asadoyvino/api/TraerToquesSinAprobar.php')
            .then((response) => {
                try {
                    this.setState({
                        toques: response.data.data,
                        ok:true
                    })
                }catch{
                    this.setState({
                        ok: false
                    })
                }
                }
            )

        axios.get('http://desafinando.com/asadoyvino/api/TraerBandas.php')
            .then((response) => {
                this.setState({
                    bandas: response.data.data
                })
            })
    }

    aprobarToque = (id, index) => {
        alert("aprobando toque de id" + id)
        axios.get('https://desafinando.com/asadoyvino/api/AprobarToque.php?id=' + id + '&idBanda=' + this.state.idBandaSeleccionada).then((response) => {
            alert(response.data);
        })
    }

    onChangeSelectBanda = (e) => {
        this.setState({
            idBandaSeleccionada: e.target.value
        })
    }

    render() {
        return (
            <div>
                {this.state.ok===true &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Asignar banda</th>
                                <th>Aprobar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.toques.map((toque, i) => (
                                <tr>
                                    <td>{toque.nombre}</td>
                                    <td>
                                        <select onChange={this.onChangeSelectBanda}>
                                            {this.state.bandas.map((banda) => (
                                                <option value={banda.id}>
                                                    {banda.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><button id={i} onClick={() => this.aprobarToque(toque.id, i)}>Aprobar</button></td>
                                </tr>

                            )
                            )}
                        </tbody>
                    </Table >
                }
                <AgregarBanda></AgregarBanda>
            </div>
        )
    }
}

export default Add;