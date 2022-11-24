import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const ButtonEdit = (x) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <td class="col-md-2">
            <img src={`http://localhost:5000/${x.data.image}`} class="pointer" width="100" alt="button" onClick={handleShow}></img>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img
                        src={`http://localhost:5000/${x.data.image}`}
                        class="imageInModel"
                        width="100"
                        alt="button"
                        onClick={handleShow}
                    ></img>
                </Modal.Body>
            </Modal>
        </td>
    );
};

export default ButtonEdit;
