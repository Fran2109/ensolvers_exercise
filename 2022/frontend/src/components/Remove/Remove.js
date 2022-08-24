import { Col, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext.js";
import { DataContext } from "../../contexts/dataContext.js";
import axios from "axios";
import { reactAppApiEndpoint } from "../../config/config.js";
import Swal from "sweetalert2";

const Remove = ({note, updateNotes}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [dataContext, setDataContext] = useContext(DataContext);
    const [userContext, setUserContext] = useContext(UserContext);

    const handleSubmit = () => {
        const headers = {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userContext.token}`
            }
        }
        axios
            .delete(`${reactAppApiEndpoint}api/notes/${note.id}`, headers)
            .then(res => {
                setDataContext({ ...dataContext, notes: dataContext.notes.filter(note2 => note2.id !== note.id) });
                toggle();
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your note has been removed',
                    timer: 1500
                })
                updateNotes();
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <Col>
            <Button color="danger" onClick={toggle}>
                <FaTrashAlt size={"20px"}/>
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Delete Note
                </ModalHeader>
                <ModalBody>
                    <p>The note will be deleted permanently. Are you sure?</p>
                    <p>Title: {note.title}</p>
                    <p>Last Updated: {note.updated_at}</p>
                    <p>Content: {note.content}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Remove</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Col>
    )
}

export default Remove;