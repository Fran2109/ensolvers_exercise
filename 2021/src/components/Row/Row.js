import React from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';
import Update from '../Update/Update';
import Delete from '../Delete/Delete';
import Move from '../Move/Move';
import { FaFolder, FaFile } from "react-icons/fa";
import './Row.css';
import {Link} from 'react-router-dom';

const Row = ({item, type}) => {
    const onChange = (e) =>{
        const itemObject = {
            state: e.target.checked
        };
        if(type === 'item')
        {
            axios.put('http://localhost:4000/items/update-item/' + item._id, itemObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        else
        {
            axios.put('http://localhost:4000/items/update-folder/' + item._id, itemObject)
            .then((res) => {
                console.log(res.data)
                console.log('Folder successfully updated')
            }).catch((error) => {
                console.log(error)
            })
            axios.put('http://localhost:4000/items/update-folder-state/' + item._id, itemObject)
            .then((res) => {
                console.log(res.data)
                console.log('Folder successfully updated')
            }).catch((error) => {
                console.log(error)
            })

        }
    }

    return(
        <tr>
            <td className="check">
                <Input type="checkbox" defaultChecked={item.state} onChange={onChange} />{' '}
                {type==="item"? <FaFile /> : <FaFolder />}
            </td>
            <td>
                {type==="item"? 
                item.name
                :
                <Link to={`/${item._id}`}>{item.name}</Link>
                }
            </td>
            <td>{item.dateCreated}</td>
            <td>{item.dateUpdated===null? 'Never Updated' : item.dateUpdated}</td>
            <td className="action">
                <Update id={item._id} type={type} />
                <Delete id={item._id} type={type} />
                {type==="item"?<Move id={item._id} type={type} />:null}
            </td>
        </tr>
    )
}

export default Row;