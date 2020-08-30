import React from 'react';
import ListaToques from './Components/ListaToques';
import ListaToquesOpinion from './Components/ListaToquesOpinion';
import Destacado from './Components/Destacado/Destacado';
import Add from './Components/Admin/Add';
import './Estilos/Principal.css';
import './Estilos/App.css';
import { Container, Button, lightColors, darkColors } from 'react-floating-action-button'

function Home() {
  console.log(window.innerWidth);
  return (
    <>
    <div className="fondo" style={{width: window.innerWidth}}>
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
        <Container>
            <Button
                className="fab-item btn btn-link btn-lg text-white"
                tooltip="Escribinos a WhatsApp!"
                icon="fa fa-whatsapp"
                text="Contacto"
                styles={{backgroundColor: darkColors.blue, color: lightColors.white, marginRight: -30, marginBottom: -30}}
                onClick={enviarMensaje} />
        </Container>
    </div>
    </>
  );
}

function enviarMensaje(){
  window.location.href="https://api.whatsapp.com/send?phone=59893978555&text=Contacto%20desde%20Desafinando.com";
}
export default Home;
