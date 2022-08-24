import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, FormGroup, Label, Input, Row, Col, Alert } from 'reactstrap';
import { useState, useContext } from 'react';
import axios from 'axios';
import { reactAppApiEndpoint } from './../../config/config';
import { UserContext } from '../../contexts/userContext.js';
import { DataContext } from '../../contexts/dataContext.js';

const Categories = ({ setSelectedCategories, defaultCategories = [], updateCategories }) => {
    const [newCategory, setNewCategory] = useState('');
    const [userContext, setUserContext] = useContext(UserContext);
    const [dataContext, setDataContext] = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState('');

    const addCategory = () => {
        if(newCategory.length > 0){
            const data = {
                name: newCategory
            }
            const headers = {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${userContext.token}`
                }
            }
            axios.post(reactAppApiEndpoint + 'api/categories', data, headers)
            .then(res => {
                setErrorMessage('');
                setDataContext({ ...dataContext, categories: [...dataContext.categories, res.data] });
                setNewCategory('');
                updateCategories();
            }).catch(err => {
                setErrorMessage(err.response.data.message);
            })
        } else {
            setErrorMessage('Please enter a category name');
        }
    }

    return(
        <>
            <FormGroup>
                <Label for="category">Category</Label>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={dataContext.categories}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    onChange={(e, value) => setSelectedCategories(value)}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        )
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Categories"
                            placeholder="Categories"
                        />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    defaultValue={defaultCategories}
                />
            </FormGroup>
            <FormGroup>
                <Alert color="danger" isOpen={errorMessage.length > 0}>
                    {errorMessage}
                </Alert>
                <Row>
                    <Col sm="10">
                        <Input
                            type="text"
                            name="newCategory"
                            id="newCategory"
                            placeholder="New Category"
                            onChange={(e) => setNewCategory(e.target.value)}
                            value={newCategory}
                        />
                    </Col>
                    <Col sm="2">
                        <Button color="primary" onClick={addCategory}>Add</Button>
                    </Col>
                </Row>
            </FormGroup>
        </>
    )

}   

export default Categories;