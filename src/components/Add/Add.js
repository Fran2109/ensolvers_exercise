import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import axios from 'axios';

const Add = ({ type }) =>{
    const [addItem, setAddItem ]=useState();
    const [addFolder, setAddFolder ]=useState();
    const [name, setName] = useState('');
    const [time, setTime] = useState((new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+(new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()));
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const onChange = (e) => {
        setName(e.target.value);
        console.log(name);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setTime((new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+(new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()));
        const itemObject = {
            name: name,
            dateCreated: time
        };
        axios.post('http://localhost:4000/items/create-item', itemObject)
            .then(res => console.log(res.data));
        window.location.reload();
    }

    return (
    <div>
        <Button color="success" onClick={toggle}>{type=="item"? "Add Item" : "Add Folder" }</Button>
        <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{type=="item"? "Add Item" : "Add Folder" }</ModalHeader>
            <Form onSubmit={onSubmit}>
                {type=="item"?
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Item Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Item Name" onChange={(e) => onChange(e)}/>
                        </FormGroup>
                    </ModalBody>
                :
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                }
                <ModalFooter>
                    <Button color="primary" onClick={toggle} type="submit">{type=="item"? "Add Item" : "Add Folder" }</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter> 
            </Form>
        </Modal>
    </div>
    );
}

export default Add