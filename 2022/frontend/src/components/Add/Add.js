import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useState, useContext } from 'react';
import CategoriesSelector from './../CategoriesSelector/CategoriesSelector';
import axios from 'axios';
import { reactAppApiEndpoint } from '../../config/config.js';
import { UserContext } from '../../contexts/userContext.js';
import { DataContext } from '../../contexts/dataContext.js';
import Swal from 'sweetalert2';

const Add = ({archived, updateNotes, updateCategories}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [dataContext, setDataContext] = useContext(DataContext);
    const [userContext, setUserContext] = useContext(UserContext);
    
    const handleSubmit = () => {
        if (title.length > 0 && content.length > 0) {
            const data = {
                title: title,
                content: content,
                categories: selectedCategories,
                archived: archived
            };
            const headers = {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${userContext.token}`
                }
            }
            axios.post(`${reactAppApiEndpoint}api/notes`, data, headers)
            .then(res => {
                setDataContext({ ...dataContext, notes: [...dataContext.notes, res.data] });
                toggle();
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your note has been added',
                    timer: 1500
                })
                updateNotes()
            }).catch(err => {
                console.log(err)
                toggle();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    timer: 1500
                })
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields',
                timer: 1500
            })
        }
    }

    return (
        <>
            <Button color="info" size="sm" onClick={toggle}>
                Create {archived && "Archived"} Note
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create {archived && "Archived"} Note</ModalHeader>
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
                        <CategoriesSelector
                            setSelectedCategories={setSelectedCategories}
                            updateCategories={updateCategories}
                        />
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Create</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
        
    )
}

export default Add;