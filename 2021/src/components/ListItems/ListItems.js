import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import Add from '../Add/Add';
import Row from '../Row/Row';
import './ListItems.css';

const ListItems = () =>{
    const [items, setItems] = useState();    
    const [folders, setFolders] = useState();

    useEffect(() => {
        axios.get('http://localhost:4000/items/')
        .then(res => {
            setItems(res.data);
        })
        .catch((error) => {
            console.log(error);
        })  

        axios.get('http://localhost:4000/items/Get-Folders')
        .then(res => {
            setFolders(res.data);
        })
        .catch((error) => {
            console.log(error);
        }) 
    }, []);
      
    return(
        <div className="ListItems">
            <div className="table-wrapper">
                <Table striped bordered hover style={{width: "auto"}}>
                    <thead>
                    <tr>
                        <th>State</th>
                        <th>Name</th>
                        <th>Date Creation</th>
                        <th>Date Updated</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {folders!==undefined? 
                            folders.map((item) => {
                                return(
                                    <Row key={item._id} item={item} type="folder"/>
                                )
                            })
                        : null}
                        {items!==undefined? 
                            items.map((item) => {
                                return(
                                    <Row key={item._id} item={item} type="item"/>
                                )
                            })
                        : null}
                    </tbody>
                </Table>
                <div className="ListFooter">
                    <Add type="item" />
                    <Add type="folder" />
                </div>
            </div>
        </div>
    )
}

export default ListItems;