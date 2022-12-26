import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonCreateMedia from "../Component/ButtonMedia/CreateMedia";
import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Video from "./SubPage/Video";
import { ToastContainer } from "react-toastify";
const { REACT_APP_PATH } = process.env;
const Media = () => {
    const [Data, setData] = useState();
    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH}/admin/api/FindVideo`).then((res) => {
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
                                    <ButtonCreateMedia />
                                </div>
                                <div class="row ">
                                    {Data ? (
                                        Data.map((data) => {
                                            return <Video key={data._id} data={data} />;
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Container>
    );
};

export default Media;