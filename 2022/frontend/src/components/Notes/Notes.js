import { useEffect, useState, useContext, useRef } from "react";
import { FaStickyNote } from "react-icons/fa";
import { Card, Button, CardBody, CardTitle, CardSubtitle, CardText, Col, Row, CardFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import { UserContext } from "./../../contexts/userContext";
import { DataContext } from "./../../contexts/dataContext";
import { reactAppApiEndpoint } from "../../config/config.js";
import './Notes.css';
import Add from './../Add/Add.js';
import Remove from './../Remove/Remove.js';
import ArchiveUnarchive from "./../ArchiveUnarchive/ArchiveUnarchive.js";
import Edit from "./../Edit/Edit.js";
import axios from "axios";
import { io } from "socket.io-client";

const Notes = () => {
    const [archived, setArchived] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);
    const [dataContext, setDataContext] = useContext(DataContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categorySelected, setCategorySelected] = useState("All");
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const [isLoading, setIsLoading] = useState(false);
    const client = useRef();
    
    const fetchNotes = (id = 0) => {
        const headers = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }
        setIsLoading(true);
        if(id === 0) {
            axios.get(`${reactAppApiEndpoint}api/notes`, headers)
            .then(res => {
                setIsLoading(false);
                setDataContext({ ...dataContext, notes: res.data });
            }).catch(err => {
                console.log(err);
            }) 
        } else {
            axios.get(`${reactAppApiEndpoint}api/notes/category/${id}`, headers)
            .then(res => {
                setIsLoading(false);
                setDataContext({ ...dataContext, notes: res.data });
            }).catch(err => {
                console.log(err);
            })
        }
        
    }
    
    const fetchCategories = () => {
        const headers = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`${reactAppApiEndpoint}api/categories`, headers)
        .then(res => {
            setDataContext({ ...dataContext, categories: res.data });
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        const headers = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(reactAppApiEndpoint + 'api/notes/all', headers)
            .then(res => {
                setIsLoading(false);
                setDataContext({ ...dataContext, categories: res.data.categories, notes: res.data.notes });
            }).catch(err => {
                console.log(err);
            })
    } ,[]);

    useEffect(() => {
        const socket = io(reactAppApiEndpoint);

        socket.on('refreshNotes', () => {
            fetchNotes();
        });

        socket.on('refreshCategories', () => {
            fetchCategories();
        });

        client.current = socket;

        return() => {
            socket.off('refreshNotes');
            socket.off('refreshCategories');
        }
    }, [])

    const send = () => {
        client.current.emit('updateNotes');
    }
    const sendCategories = () => {
        client.current.emit('updateCategories');
    }

    return (
        <div style={{width:"80%"}}>
            <h1>My Notes</h1>
            <Row style={{marginBottom: "10px"}}>
                {userContext.token && (
                    <Col sm="3">
                        <Add archived={archived} updateNotes={send} updateCategories={sendCategories}/>
                    </Col>
                )}
                <Col sm="3">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down" size="sm" >
                        <DropdownToggle caret>
                            {categorySelected}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem 
                                onClick={() => {
                                    setCategorySelected("All");
                                    fetchNotes();
                                    toggle();
                                }}>
                                    All
                            </DropdownItem>
                            {dataContext.categories && dataContext.categories.map((category) => {
                                return (
                                    <DropdownItem 
                                        onClick={() => {
                                            setCategorySelected(category.name);
                                            toggle();
                                            fetchNotes(category.id);
                                        }}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col>
                    <p
                        onClick={() => setArchived(!archived)}
                        style={{ cursor: "pointer", color: "blue", fontSize: "20px", width: "auto" }}
                    >
                        { archived ? "Go back to Unarchived Notes" : "Go to Archived Notes" }
                    </p>
                </Col>
            </Row>
            {isLoading ? (
                <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                    <Spinner color="dark"/>
                </div>
            )
            : (
                <div className="Notes">
                    {dataContext.notes && dataContext.notes.map(note => (
                        Boolean(note.archived) === archived && (
                            <Card key={note.id} className="Note">
                                <Row>
                                    <Col sm="4" className="NoteIcon" style={{paddingLeft: "30px", paddingTop: "10px"}}>
                                        <FaStickyNote size={"90px"}/>
                                    </Col>
                                    <Col sm="8">
                                        <CardBody>
                                            <CardTitle>{note.title}</CardTitle>
                                            <CardSubtitle>Last Edited: {note.updated_at}</CardSubtitle>
                                            <CardText>{note.content}</CardText>
                                        </CardBody>
                                    </Col>
                                </Row>
                                {
                                    userContext.token && (
                                        <CardFooter>
                                            <Row>
                                                <Edit note={note} updateNotes={send} updateCategories={sendCategories}/>
                                                <Remove note={note} updateNotes={send}/>
                                                <ArchiveUnarchive archived={archived} note={note} updateNotes={send}/>
                                            </Row>
                                        </CardFooter>
                                    )
                                }
                            </Card>
                        )
                    ))}
                    {dataContext.notes && dataContext.notes.length === 0 && (
                        <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                            <h3>No Notes Found</h3>
                        </div>
                    )}
                </div> 
            )}
        </div>
    );
}

export default Notes;