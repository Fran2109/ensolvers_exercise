import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Delete = ({ type, id }) =>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const deleteItem = (id) => {
        if (type==="item")
        {
            axios.delete('http://localhost:4000/items/delete-item/' + id)
            .then((res) => {
                console.log('Item successfully deleted!')

            }).catch((error) => {
                console.log(error)
            })
        } 
        else 
        {
            axios.delete('http://localhost:4000/items/delete-folder/' + id)
            .then((res) => {
                console.log('Folder successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            axios.delete('http://localhost:4000/items/delete-item-in-folder/' + id)
            .then((res) => {
                console.log('Items in Folder successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
        }
        
        Swal.fire({
            icon: 'error',
            title: type==="item"?'Item Deleted Successfully':'Folder Deleted Successfully',
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