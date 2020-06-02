import React from 'react';
import ListaToques from './Components/ListaToques';
import ListaToquesOpinion from './Components/ListaToquesOpinion';
import Destacado from './Components/Destacado/Destacado';
import './Estilos/Principal.css';
import './Estilos/App.css';

function Home() {
  console.log(window.innerWidth);
  return (
    <div className="fondo">
      <div className="rowGeneral">
        <div className="columnGeneral">
          { (window.innerWidth < 600) && <Destacado></Destacado>}
          <ListaToques></ListaToques>
        </div>
        <div className="columnGeneral">
          { (window.innerWidth > 600) && <Destacado></Destacado>}
          <ListaToquesOpinion></ListaToquesOpinion>
        </div>
      </div>
    </div>
  );
}

export default Home
  ;
