import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import Row from './../Row/Row';
import Add from './../Add/Add';

const ListItemsInFolder = () => {
    const {folderId} = useParams();
    const [items, setItems] = useState();

    useEffect(() => {
        axios.get('http://localhost:4000/items/Get-Items-Folder/'+folderId)
        .then(res => {
            setItems(res.data);
            console.log(items);
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
                    <Button color="success"><Link to="/" style={{textDecoration: "none", color: "white"}}>Return to Root</Link></Button>
                    <Add type="item" parentId={folderId}/>
                </div>
            </div>
        </div>
    )
}

export default ListItemsInFolder;