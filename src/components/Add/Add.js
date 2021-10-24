import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Add = ({ type, parentId=null }) =>{
    const [name, setName] = useState('');
    var date = new Date();
    const [time, setTime] = useState((date.getUTCFullYear())+"/"+
        ((date.getUTCMonth() + 1)<10?"0"+(date.getUTCMonth() + 1):(date.getUTCMonth() + 1))+"/"+
        (date.getUTCDate()<10?"0"+date.getUTCDate():date.getUTCDate())+"-"+
        (new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+
        (new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes())+":"+
        (new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds()));
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const onChange = (e) => {
        setName(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        setTime(
            (date.getUTCFullYear())+":"+
            ((date.getUTCMonth() + 1)<10?"0"+(date.getUTCMonth() + 1):(date.getUTCMonth() + 1))+":"+
            (date.getUTCDate()<10?"0"+date.getUTCDate():date.getUTCDate())+":"+
            (new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+
            (new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes())+":"+
            (new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds()));
        const itemObject = {
            name: name,
            dateCreated: time,
            folder: parentId===null?null:parentId,
        };
        if(itemObject.folder===null){delete itemObject.folder;}
        axios.post('http://localhost:4000/items/'+(type==="item"?'create-item':'create-folder'), itemObject)
        .then(res => console.log(res.data));
        Swal.fire({
            icon: 'success',
            title: type==="item"? "Item Created Successfully" : "Folder Created Successfully" ,
        })
        setTimeout(function () {
            window.location.reload();
        }, 1000);  
    }

    return (
    <div>
        <Button color="success" onClick={toggle}>{type==="item"? "Add Item" : "Add Folder" }</Button>
        <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{type==="item"? "Add Item" : "Add Folder" }</ModalHeader>
            <Form onSubmit={onSubmit}>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">{type==="item"?"Item Name":"Folder Name"}</Label>
                        <Input type="text" name="name" id="name" placeholder="Item Name" onChange={(e) => onChange(e)}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle} type="submit">{type==="item"? "Add Item" : "Add Folder" }</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter> 
            </Form>
        </Modal>
    </div>
    );
}

export default Add