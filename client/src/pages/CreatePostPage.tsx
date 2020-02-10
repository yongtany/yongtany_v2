import React, { useState } from 'react'
import { Typography, Button, Form, Input, message } from 'antd';
import QuillEditor from '../components/Editor/QuillEditor';
import FileUpload from '../components/FileUpload/FileUpload';
import axios from 'axios';
import { POST_SERVER } from '../components/Config';

const { Title } = Typography;

const Categories = [
    { key: 1, value: "Dev" },
    { key: 2, value: "Travel" },
    { key: 3, value: "Life" },
    { key: 4, value: "Food" },
    { key: 5, value: "Church" },
]

function CreatePostPage(props: any) {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState(1)
    const [Image, setImage] = useState('')
    const [Files, setFiles] = useState([]);


    const handleTitle = (event: any) => {
        setTitle(event.currentTarget.value)
    }

    const handleContent = (value: any) => {
        setContent(value)
    }

    const handleCategorySelectChange = (event: any) => {
        setCategory(event.currentTarget.value)
    }

    const updateImage = (newImage: any) => {
        setImage(newImage)
    }

    const handleFiles = (files: any) => {
        setFiles(files)
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (!title || !content || 
            !category || !Image) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: window.localStorage.getItem('userId'),
            title: title,
            content: content,
            thumbnail: Image,
            category: category,
        }

        axios.post(`${POST_SERVER}/createPost`, variables)
            .then(response => {
                if (response.data.success) {
                    message.success('Post Created!');
                    setTimeout(() => {
                        props.history.push('/')
                    }, 2000);
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: 'auto', padding: '3rem 0 3rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title style={{ color: 'white'}} level={2}> 포스트 업로드</Title>
            </div>

            <Form style={{ color: 'white'}} onSubmit={handleSubmit}>
                DropZone
                <FileUpload refreshFunction={updateImage} />

                <br />
                <br />
                <label>제목</label>
                <Input
                    onChange={handleTitle}
                    value={title}
                />
                <br />
                <br />

                <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={handleContent}
                    onFilesChange={handleFiles}
                />
                
                <br />
                
                <select style={{ color: 'black'}}onChange={handleCategorySelectChange}>
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>

                <br />
                <br />

                <Button
                        size="large"
                        htmlType="submit"
                        className=""
                        onSubmit={handleSubmit}
                    >
                        포스트 생성
                </Button>

            </Form>
        </div>
    )
}

export default CreatePostPage