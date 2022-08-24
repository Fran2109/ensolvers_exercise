import { FaArchive, FaRegArrowAltCircleUp } from "react-icons/fa";
import { Button, Col } from "reactstrap";
import { useState, useCallback, useEffect, useContext } from 'react';
import axios from "axios";
import { UserContext } from './../../contexts/userContext.js';
import { DataContext } from './../../contexts/dataContext.js';
import { reactAppApiEndpoint } from "./../../config/config.js";

const ArchiveUnarchive = ({archived, note, updateNotes}) => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [dataContext, setDataContext] = useContext(DataContext);

    const handleArchive = () => {
        const data = {
            note
        }
        const headers = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext.token}`
            }
        }
        axios.put(`${reactAppApiEndpoint}api/notes/archive`, data, headers)
            .then(res => {
                dataContext.notes.find(note2 => note2.id === note.id).archived = !note.archived;
                setDataContext({ ...dataContext });
                updateNotes();
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <Col>
            <Button color="success" onClick={handleArchive}>
                {
                    archived ? (
                        <FaRegArrowAltCircleUp size={"20px"}/>
                    ) : (
                        <FaArchive size={"20px"}/>
                    )
                }
            </Button>
        </Col>
    )
}

export default ArchiveUnarchive;