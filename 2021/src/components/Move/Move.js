import React, { useState, useEffect } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, DropdownItem, DropdownMenu, Dropdown, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Move = ({id}) => {
    var date = new Date();
    const [time, setTime] = useState(
        (date.getUTCFullYear())+"/"+
        ((date.getUTCMonth() + 1)<10?"0"+(date.getUTCMonth() + 1):(date.getUTCMonth() + 1))+"/"+
        (date.getUTCDate()<10?"0"+date.getUTCDate():date.getUTCDate())+"-"+
        (new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+
        (new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes())+":"+
        (new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds()));
    const [folders, setFolders] = useState();
    const [folderId, setFolderId] = useState();
    const [modal, setModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get('http://localhost:4000/items/Get-Folders')
        .then(res => {
            setFolders(res.data);
        })
        .catch((error) => {
            console.log(error);
        })    
      }, []);

      const onChange = (e) => {
        setFolderId(e.target.value);
        console.log(folderId)
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
            dateUpdated: time,
            folder: folderId !==null ? folderId : null
        };
        axios.put('http://localhost:4000/items/update-item/' + id, itemObject)
        .then((res) => {
            console.log(res.data)
            console.log('Item successfully updated')
        }).catch((error) => {
            console.log(error)
        })
        Swal.fire({
            icon: 'success',
            title: "Item Moved Successfully",
        })
        setTimeout(function () {
            window.location.reload();
        }, 1000); 
    }
    return (
        <div className="option">
            <Button color="secondary" onClick={toggle}>Move</Button>
            <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Move Item</ModalHeader>
                <Form onSubmit={onSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Dropdown isOpen={dropdownOpen} toggle={()=>setDropdownOpen(!dropdownOpen)}>
                                <DropdownToggle caret>
                                    Folder
                                </DropdownToggle>
                                <DropdownMenu>
                                    {folders!==undefined?
                                        folders.map(folder=>{
                                            return(
                                                <DropdownItem key={folder._id} onClick={onChange} value={folder._id}>{folder.name}</DropdownItem>
                                            )}
                                        )
                                    :
                                    null}
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle} type="submit">Move Item</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter> 
                </Form>
            </Modal>
        </div>
    )
};

export default Move;