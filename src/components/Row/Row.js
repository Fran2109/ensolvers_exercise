import React, { useState } from 'react';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

import Update from '../Update/Update';
import Delete from '../Delete/Delete';
import './Row.css';

const Row = ({item}) => {
    const onChange = (e) =>{
        const studentObject = {
            state: e.target.checked
        };      
        axios.put('http://localhost:4000/items/update-item/' + item._id, studentObject)
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <tr>
            <td className="check"><Input type="checkbox" defaultChecked={item.state} onChange={onChange} /></td>
            <td>{item.name}</td>
            <td>{item.dateCreated}</td>
            <td>{item.dateUpdated===null? 'Never Updated' : item.dateUpdated}</td>
            <td className="action">
                <Update id={item._id} type="item" />
                <Delete id={item._id} type="item" />
                <Button color="secondary">Move</Button>
            </td>
        </tr>
    )
}

export default Row;