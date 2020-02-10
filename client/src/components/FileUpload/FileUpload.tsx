import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

import { POST_SERVER } from '../Config';

function FileUpload(props: any) {

    const [Image, setImage] = useState('')

    const onDrop = (files: any) => {

        let formData = new FormData();
        const config: any = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        axios.post(`${POST_SERVER}/upload`, formData, config)
            .then((response: any) => {
                if (response.data.success) {
                    setImage(response.data.url)
                    props.refreshFunction(response.data.url)

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image: any) => {
        let newImages = ''
        setImage(newImages);
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                    <div onClick={() => onDelete(Image)}>
                        {Image && 
                            <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${Image}`} alt='post' />
                        }
                    </div>
            </div>

        </div>
    )
}

export default FileUpload