import React from 'react';
import {useState} from 'react';

function UploadImage(props){

    const [image, setImage] = useState('');
    const [loading, setLoading]= useState(false)

    const uploadImage = async e => {
        const files=e.target.files
        const data= new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'asadoyvino')
        setLoading(true)
        const response= await fetch(
            'https://api.cloudinary.com/v1_1/dyvyiepbv/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file= await response.json()
        setImage(file.secure_url)
        setLoading(false)
        props.capturo(file.secure_url)
    }


    return(
        <>
        <div>
            <input type="file"
                name="file"
                placeholder="Upload Image"
                onChange={uploadImage}
            ></input>
            {loading===true ? 
                <h3>Subiendo imagen...</h3>
             : 
                <img alt="imagen" src={image} style={{width:'50px'}}/>
            }
        </div>
        </>
    )
}

export default UploadImage;