import React from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';

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
            <td><Input type="checkbox" defaultChecked={item.state} onChange={onChange} /></td>
            <td>{item.name}</td>
            <td>{item.dateCreated}</td>
            <td>
                action
            </td>
        </tr>
    )
}

export default Row;