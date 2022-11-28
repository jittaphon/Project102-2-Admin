import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListYear from "../Component/ListComponent/ListYear";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ButtonCreateRecordsYear from "../Component/ButtonCRUD/ButtonCreate/ButtonCreateRecord";
import { Spinner } from "react-bootstrap";
const { REACT_APP_PATH } = process.env;
const Data = () => {
    const [Data, setData] = useState("");
    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH}/admin/api/FindDataEachYear`).then((res) => {
                // ดึงข้อมูล Data ทั้งหมด
                setData(res.data);
            });
        }
        get();
    }, []);
    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div class="p-2">
                                    <ButtonCreateRecordsYear />
                                </div>
                                <ListGroup>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th class="col-md-10">ปีข้อมูล</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Data ? (
                                                Data.map((data) => {
                                                    return <ListYear key={data._id} data={data} />; // map ออกมาเป็นปีก่อน
                                                })
                                            ) : (
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                    style={{ width: "3rem", height: "3rem", margin: "20px" }}
                                                >
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            )}
                                        </tbody>
                                    </table>
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Data;
