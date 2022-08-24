import { Col, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup,Input, FormFeedback } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../contexts/userContext.js";
import { DataContext } from "../../contexts/dataContext.js";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import axios from "axios";
import { reactAppApiEndpoint } from "./../../config/config.js";
import Swal from 'sweetalert2';

const Edit = ({note, updateNotes, updateCategories}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [defaultCategories, setDefaultCategories] = useState([]);
    const [dataContext, setDataContext] = useContext(DataContext);
    const [userContext, setUserContext] = useContext(UserContext);

    useEffect(() => {
        if(modal){
            axios.get(`${reactAppApiEndpoint}api/categories/notes/${note.id}`)
            .then(res => {
                setDefaultCategories(res.data);
            }).catch(err => {
                console.log(err)
            })
        }
    } , [modal])

    const handleSubmit = () => {
        if (title.length > 0 && content.length > 0) {
            const data = {
                note: {
                    title: title,
                    content: content,
                    archived: note.archived
                },
                categories: selectedCategories
            };
            const headers = {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userContext.token}`
                }
            }
            axios
                .put(`${reactAppApiEndpoint}api/notes/${note.id}`, data, headers)
                .then(res => {
                    setDataContext({ ...dataContext, notes: dataContext.notes.map(note => note.id === Number(res.data.id) ? res.data : note) });
                    toggle();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Your note has been updated',
                        timer: 1500
                    })
                    updateNotes()
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    return(
        <Col>
            <Button color="primary" onClick={toggle}>
                <FaEdit size={"20px"}/>
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Note</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input 
                                type="text" 
                                name="title" 
                                id="title" 
                                placeholder="Title" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                invalid={title.length===0}
                            />
                            <FormFeedback>Please enter a Title</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input 
                                type="textarea" 
                                name="content" 
                                id="content" 
                                placeholder="Content" 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)}
                                invalid={content.length===0}
                            />
                            <FormFeedback>Please enter some Content</FormFeedback>
                        </FormGroup>
                        {defaultCategories.length > 0 && <CategoriesSelector defaultCategories={defaultCategories} setSelectedCategories={setSelectedCategories} updateCategories={updateCategories}/>}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Col>
    )
}

export default Edit;