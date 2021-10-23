import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Label, Input, Table } from 'reactstrap';
import Add from '../Add/Add';
import Row from '../Row/Row';

const ListItems = () =>{
    const [items, setItems] = useState();    

    useEffect(() => {
      axios.get('http://localhost:4000/items/')
      .then(res => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      })        
    }, []);

    return(
        <div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>State</th>
                    <th>Name</th>
                    <th>Date Creation</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {items!=undefined? 
                        items.map((item) => {
                            return(
                                <Row key={item._id} item={item}/>
                            )
                        })
                    : null}
                </tbody>
            </Table>
            <Add type="item" />
            <Add type="folder" />
        </div>
    )
}

export default ListItems;