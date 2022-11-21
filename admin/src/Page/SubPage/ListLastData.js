import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonDelete from "../../Component/ButtonCRUD/ButtonDelete/ButtonDelete";
import ButtonEdit from "../../Component/ButtonCRUD/ButtonEdit/ButtonEditData";
const Data = () => {
    const { param1, param2, param3 } = useParams();
    const [Data, setData] = useState([]);
    useEffect(() => {
        function get() {
            axios.get(`http://localhost:5000/admin/api/FindDataEachYearByDate/${param2}/${param3}`).then((res) => {
                setData(res.data[0].data);
            });
        }
        get();
    }, [param1, param2, param3]);

    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div class="p-2">
                                    <div></div>
                                </div>
                                <ListGroup>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th class="col-md-7">Name</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Data.map((x, index) => (
                                                <tr>
                                                    <td class="col-md-7">{x.name}</td>
                                                    <td>
                                                        <ButtonEdit data={x} />
                                                    </td>
                                                    <td>
                                                        <ButtonDelete data={x} />
                                                    </td>
                                                </tr>
                                            ))}
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
