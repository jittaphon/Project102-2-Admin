import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
const { REACT_APP_PATH } = process.env;
const PersonDetail = () => {
    // check token
    const navigate = useNavigate();
    const jwt = localStorage.getItem("mini-session");

    if (!jwt) {
        navigate("/Login");
    }
    const { exp } = jwtDecode(jwt);
    const expirationTime = exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
        localStorage.clear();
        navigate("/Login");
    }
    ////////////////////////////////////////////////////
    const { param } = useParams();
    const [Data, setData] = useState();
    const [FirstName, setFirstName] = useState();
    const [LastName, setLastName] = useState();
    const [Email, setEmail] = useState();
    const [Phone, setPhone] = useState();
    const [JobTitle, setJobTitle] = useState();
    const [Department, setDepartment] = useState();
    const [Genders, setGenders] = useState();
    const [Profile, setProfile] = useState();
    const [OldProfile, setOldProfile] = useState();
    const [OperatingManual, setOperatingManual] = useState();
    const [Level, setLevel] = useState();

    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH}/admin/api/DataPersonById/${param}`).then((res) => {
                setData(res.data);
                setLastName(res.data.Last_name);
                setFirstName(res.data.First_name);
                setEmail(res.data.Email);
                setPhone(res.data.Phone);
                setJobTitle(res.data.Job_title);
                setDepartment(res.data.Department);
                setGenders(res.data.Gender);
                setOperatingManual(res.data.Operating_Manual);
                setProfile(res.data.Profile);
            });
        }
        get();
    }, [param]);

    function AddOPM(e) {
        setOperatingManual(e.target.files[0]);
    }

    const AddIMG = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const { files } = e.target;
        let images = [];
        const selecteds = [...[...files]];
        selecteds.forEach((i) => images.push(URL.createObjectURL(i)));
        setProfile(base64);
        setOldProfile(base64);
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const notify = () =>
        toast.warn("กรุณา upload file pdf. ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const onSubmit = async () => {
        if (
            FirstName === "" ||
            LastName === "" ||
            JobTitle === "" ||
            Department === "" ||
            Genders === ""
        ) {
            notify();
        } else {
            const formData = new FormData();
            formData.append("First_name", FirstName);
            formData.append("Last_name", LastName);
            formData.append("Gender", Genders);
            formData.append("Email", Email);
            formData.append("JobTitle", JobTitle);
            formData.append("Department", Department);
            formData.append("Phone", Phone);
            formData.append("Operating_Manual", OperatingManual);
            formData.append("Profile", OldProfile);
            await axios.put(`${REACT_APP_PATH}/admin/api/UpdatePerson/${param}`, formData).then((res) => {
                if (res) {
                    Swal.fire("เเก้ไขข้อมูลสำเร็จ").then(() => {
                        navigate("/Person");
                    });
                }
            });
        }
    };

    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div class="row p-2">
                                    <div class="col-5">
                                        <img src={`${Profile}`} alt="Girl in a jacket" width="350" height="500"></img>
                                    </div>
                                    <div class="col">
                                        <Form>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Control
                                                        placeholder="First name"
                                                        type="text"
                                                        autoFocus
                                                        value={FirstName}
                                                        onChange={(event) => setFirstName(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        placeholder="Last name"
                                                        type="text"
                                                        autoFocus
                                                        value={LastName}
                                                        onChange={(event) => setLastName(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Select
                                                        value={Genders}
                                                        onChange={(event) => setGenders(event.target.value)}
                                                    >
                                                        <option value="">เพศ</option>
                                                        <option value="ชาย">ชาย</option>
                                                        <option value="หญิง">หญิง</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Control
                                                        placeholder="ตำเเหน่ง"
                                                        type="text"
                                                        autoFocus
                                                        value={JobTitle}
                                                        onChange={(event) => setJobTitle(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        placeholder="กลุ่ม"
                                                        type="text"
                                                        autoFocus
                                                        value={Department}
                                                        onChange={(event) => setDepartment(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Control
                                                        placeholder="Email"
                                                        type="email"
                                                        autoFocus
                                                        value={Email}
                                                        onChange={(event) => setEmail(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Control
                                                        placeholder="เบอร์โทร xxx-xxx-xxxx"
                                                        type="tel"
                                                        autoFocus
                                                        value={Phone}
                                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                        onChange={(event) => setPhone(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                        <Form.Label>คู่มือปฎิบัติงาน</Form.Label>
                                                        <Form.Control
                                                            type="file"
                                                            accept="application/pdf"
                                                            onChange={AddOPM}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                        <Form.Label>Profile</Form.Label>
                                                        <Form.Control
                                                            type="file"
                                                            accept="image/png, image/jpeg"
                                                            onChange={AddIMG}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button variant="primary" type="submit" onClick={onSubmit}>
                                                Update
                                            </Button>
                                            <ToastContainer />
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PersonDetail;
