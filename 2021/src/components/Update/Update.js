import React, { useState, useEffect } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Update = ({id, type}) => {
    var date = new Date();
    const [time, setTime] = useState(
        (date.getUTCFullYear())+"/"+
        ((date.getUTCMonth() + 1)<10?"0"+(date.getUTCMonth() + 1):(date.getUTCMonth() + 1))+"/"+
        (date.getUTCDate()<10?"0"+date.getUTCDate():date.getUTCDate())+"-"+
        (new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+
        (new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes())+":"+
        (new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds()));
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        if(type==="item")
        {
            axios.get('http://localhost:4000/items/edit-item/' + id)
            .then(res => {
                setName(res.data.name);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else
        {
            axios.get('http://localhost:4000/items/edit-folder/' + id)
            .then(res => {
                setName(res.data.name);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, []);
  
    
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
        console.log(time);
        const itemObject = {
            name: name,
            dateUpdated: time
        };
        if(type==="item")
        {
            axios.put('http://localhost:4000/items/update-item/' + id, itemObject)
            .then((res) => {
                console.log(res.data)
                console.log('Item successfully updated')
            }).catch((error) => {
                console.log(error)
            })
        }
        else
        {
            axios.put('http://localhost:4000/items/update-folder/' + id, itemObject)
            .then((res) => {
                console.log(res.data)
                console.log('Folder successfully updated')
            }).catch((error) => {
                console.log(error)
            })
        }
        Swal.fire({
            icon: 'success',
            title: type==="item"? "Item Updated Successfully" : "Folder Updated Successfully" ,
        })
        setTimeout(function () {
            window.location.reload();
        }, 1000);  
    }
    return (
        <div className="option">
            <Button color="primary" onClick={toggle}>Update</Button>
            <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>{type==="item"? "Update Item" : "Update Folder" }</ModalHeader>
                <Form onSubmit={onSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">{type==="item"? "Item Name" : "Folder Name" }</Label>
                            <Input type="text" name="name" id="name" placeholder={type==="item"? "Item Name" : "Folder Name" } value={name} onChange={(e) => onChange(e)}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle} type="submit">{type==="item"? "Update Item" : "Update Folder" }</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter> 
                </Form>
            </Modal>
        </div>
    )
};

export default Update;
