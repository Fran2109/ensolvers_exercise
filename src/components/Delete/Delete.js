import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Delete = ({ type, id }) =>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const deleteItem = (id) => {
        axios.delete('http://localhost:4000/items/delete-item/' + id)
            .then((res) => {
                console.log('Item successfully deleted!')

            }).catch((error) => {
                console.log(error)
            })
        Swal.fire({
            icon: 'error',
            title: 'Item Deleted Successfully',
        })
        setTimeout(function () {
            window.location.reload();
        }, 1000);   
    }

    return (
    <div className="option">
        <Button color="danger" onClick={toggle}>{type==="item"? "Delete Item" : "Delete Folder" }</Button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{type==="item"? "Delete Item" : "Delete Folder" }</ModalHeader>
            <ModalBody>
                Are you Sure?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{ deleteItem(id); toggle(); }}>Yes</Button>{' '}
                <Button color="secondary" onClick={toggle}>No</Button>
            </ModalFooter>
        </Modal>
    </div>
    );
}

export default Delete