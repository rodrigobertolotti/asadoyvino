import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import '../Estilos/AgregarToque.css';
import ClipLoader from "react-spinners/ClipLoader";

function UploadImage(props) {

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)
    const [subido, setSubido] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'asadoyvino')
        setLoading(true)
        const response = await fetch(
            'https://api.cloudinary.com/v1_1/dyvyiepbv/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await response.json()
        setImage(file.secure_url)
        setLoading(false)
        props.capturo(file.secure_url)
        setSubido(true)
    }


    return (
        <>
            <div>
                <center>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        <input type="file"
                            name="file"
                            placeholder="Upload Image"
                            onChange={uploadImage}
                        ></input>
                    </Button>
                </center>
                <div className="espacio"></div>
                {(loading===true) &&
                <center>
                    <ClipLoader
                        size={20}
                        color={"#123abc"}
                    />
                    </center>
                }
                {(subido===true) && 
                <center><img src="https://res.cloudinary.com/dyvyiepbv/image/upload/v1590855387/subir_kyacap.png"></img></center>
                }

            </div>
        </>
    )
}

export default UploadImage;