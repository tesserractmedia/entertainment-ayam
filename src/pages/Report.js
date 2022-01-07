import React from 'react'
import { Form, Button, Card, Col, Row, Spinner, Dropdown, Modal } from 'react-bootstrap'
import { BsPatchCheck } from 'react-icons/bs'
import axios from "axios";

function Report() {

    const [loading, setLoading] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);
    const [validate, setValidate] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [id, setId] = React.useState(null);
    const [email, setEmail] = React.useState('');
    const [contentName, setContentName] = React.useState('');
    const [contentType, setContentType] = React.useState('Movie');
    const [season, setSeason] = React.useState(null);
    const [episode, setEpisode] = React.useState(null);
    const [contentYear, setContentYear] = React.useState(new Date().getFullYear());
    const [hour, setHour] = React.useState(0);
    const [minute, setMinute] = React.useState(0);
    const [second, setSecond] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [contentNameList, setContentNameList] = React.useState([]);

    var cancelToken;

    const reportMore = () => {
        setDefault();
    }

    const setDefault = () => {
        setId(null);
        setEmail('');
        setContentName('');
        setContentType('Movie');
        setContentYear(new Date().getFullYear());
        setSeason(null);
        setEpisode(null);
        setHour(0);
        setMinute(0);
        setSecond(0);
        setDescription('');
        setValidate(false);
        setSubmit(false);
        setLoading(false);
        setMessage(false);
        setShowDialog(false);
    }

    const report = (e) => {
        e.preventDefault();
        setLoading(true);
        var data = {
            "id": id,
            "title": contentName,
            "email": email,
            "year": parseInt(contentYear),
            "category": contentType,
            "season": season,
            "episode": episode,
            "time_stamp": {
                "second": second,
                "minute": minute,
                "hour": hour
            },
            "description": description
        }
        axios.post('http://127.0.0.1:8000/api/v1/report', data).then(respose => {
            if (respose.data["status"] === "success") {
                setLoading(false);
                setSubmit(true);
            } else {
                setLoading(false);
                setValidate(true);
                setShowDialog(true);
                setMessage(respose.data["message"]);
            }
        });
    }

    const onNameChange = async (e) => {
        const name = e.target.value;



        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel();
        }

        cancelToken = axios.CancelToken.source();

        const result = await axios.get(
            'http://127.0.0.1:8000/api/v1/search',
            {
                params: { name: name },
                cancelToken: cancelToken.token
            });

        if (result.data["status"] === "success" && result.data['data'] !== null) {
            setContentNameList(result.data['data']);
        } else {
            setContentNameList([]);
        }
        setId(null);
        setContentName(name);
    }

    const onNameListItemClick = (e) => {
        setId(e.target.getAttribute("data-id"));
        setContentName(e.target.getAttribute("data-name"));
        setContentYear(parseInt(e.target.getAttribute("data-year")));
        setContentType(e.target.getAttribute("data-category"));
        switch (e.target.getAttribute("data-category")) {
            case "documentary":
            case "web series":
            case "serial":
            case "other":
                setSeason(e.target.getAttribute('data-season'));
                setEpisode(e.target.getAttribute('data-episode'));
                break;
            default:

        }
    }

    const handleClose = () => {
        setShowDialog(false);
    }

    const range = (start, end, step = 1) => {
        let output = [];
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
        for (let i = start; i >= end; i -= step) {
            output.push(i);
        }
        return output;
    };


    return (
        <div className='d-lg-flex justify-content-center align-items-center pt-3 pb-3'>
            <Card className='shadow-sm'>
                <Card.Body>
                    {
                        loading ? (<div className='text-center'><Spinner className="m-5" variant="primary" animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner></div>) : submit ? <React.Fragment>
                            <div className='display-1 text-success text-center '> <BsPatchCheck /></div>
                            <p className='display-6'>Reported successfully!</p>
                            <Button onClick={reportMore}>Report More</Button>
                        </React.Fragment> : (<React.Fragment><Card.Title>

                        </Card.Title>
                            <Form noValidate validated={validate} onSubmit={report}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required type="email" placeholder="Enter email" minLength={3} maxLength={254} value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formContentName">
                                    <Form.Label>Name of Content</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle as={Form.Control} required type="text"
                                            placeholder="Enter Movie or Web Series Name" minLength={1} maxLength={100} value={contentName}
                                            onChange={onNameChange}>
                                        </Dropdown.Toggle>
                                        {
                                            contentNameList.length !== 0 ?
                                                <Dropdown.Menu className='w-100 shadow-sm'>
                                                    {

                                                        contentNameList.map((item) => {
                                                            return (<Dropdown.Item
                                                                data-id={item["id"]}
                                                                data-name={item["title"]}
                                                                data-year={item["year"]}
                                                                data-category={item["category"]}
                                                                data-season={item["season"]}
                                                                data-episode={item["episode"]}
                                                                onClick={onNameListItemClick}>
                                                                {item["title"]} | {item["category"].toLocaleUpperCase()  } {(item["category"] === "movie" || item["category"] === "song") ? "" : (item["season"] !== null ? " | Season " + item["season"].toString() : "") + (item["episode"] ? " | Episode " + item["episode"].toString() : "")}</Dropdown.Item>)
                                                        })
                                                    }
                                                </Dropdown.Menu> : <Dropdown.Menu className='w-100 text-center'><Dropdown.Item><Spinner variant="primary" animation="border" role="status" /></Dropdown.Item></Dropdown.Menu>

                                        }
                                    </Dropdown>
                                    <Form.Text className="text-muted">
                                        Please Type Complete Name
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formContentType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select required value={contentType} onChange={(e) => {
                                        setContentType(e.target.value);
                                        setId(null);
                                    }}>
                                        <option value="movie">Movie</option>
                                        <option value="web series">Web Series</option>
                                        <option value="documentary">Documentary</option>
                                        <option value="song">Song</option>
                                        <option value="serial">Serial</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                {
                                    (() => {
                                        switch (contentType) {
                                            case "web series":
                                            case "documentary":
                                            case "serial":
                                            case "other":
                                                return (
                                                    <Row className='mb-3'>
                                                        <Form.Group as={Col} className="mb-3" controlId="formSeason">
                                                            <Form.Label>Season</Form.Label>
                                                            <Form.Control placeholder="0" type='number' pattern="[0-9]*" min={0} value={season} onChange={(e) => {
                                                                if (e.target.validity.valid) {
                                                                    setSeason(e.target.value);
                                                                    setId(null);
                                                                } else {
                                                                    setSeason(null);
                                                                }
                                                            }} />
                                                            <Form.Text className="text-muted">
                                                                Optional
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <Form.Group as={Col} className="mb-3" controlId="formSeason">
                                                            <Form.Label>Episode</Form.Label>
                                                            <Form.Control placeholder="0" type='number' pattern="[0-9]*" min={0} value={episode} onChange={(e) => {
                                                                if (e.target.validity.valid) {
                                                                    setEpisode(e.target.value);
                                                                    setId(null);
                                                                } else {
                                                                    setEpisode(null);
                                                                }
                                                            }} />
                                                            <Form.Text className="text-muted">
                                                                Optional
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Row>
                                                )
                                            default:

                                        }
                                    })()
                                }
                                <Form.Group className="mb-3" controlId="formYear">
                                    <Form.Label>Release Year</Form.Label>
                                    <Form.Select required value={contentYear} onChange={(e) => {
                                        setContentYear(e.target.value);
                                        setId(null);
                                    }}>
                                        {
                                            range(new Date().getFullYear(),1900).map((item)=>{
                                                return <option value={item}>{item}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Time Stamp</Form.Label>

                                </Form.Group>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Hour</Form.Label>
                                        <Form.Control required type='number' pattern="[0-9]*" min={0} value={hour} onChange={(e) => {
                                            if (e.target.validity.valid) {
                                                setHour(e.target.value);
                                            } else {
                                                setHour(0)
                                            }
                                        }} />
                                    </Form.Group >
                                    <Form.Group as={Col} >
                                        <Form.Label>Minute</Form.Label>
                                        <Form.Control required type='number' pattern="[0-9]*" min={0} max={59} value={minute} onChange={(e) => {
                                            if (e.target.validity.valid) {
                                                setMinute(e.target.value);
                                            } else {
                                                setMinute(0)
                                            }
                                        }} />
                                    </Form.Group >
                                    <Form.Group as={Col} >
                                        <Form.Label>Second</Form.Label>
                                        <Form.Control required type='number' pattern="[0-9]*" min={0} max={59} value={second}
                                            onChange={(e) => {
                                                if (e.target.validity.valid) {
                                                    setSecond(e.target.value);
                                                } else {
                                                    setSecond(0)
                                                }
                                            }
                                            } />
                                    </Form.Group >
                                    <Form.Group as={Col} xs md sm lg xl={12}>
                                        <Form.Text className="text-muted">
                                            Enter the time stamp of scene
                                        </Form.Text>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Describe</Form.Label>
                                    <Form.Control required as="textarea" rows={3} minLength={30} maxLength={100} value={description} onChange={(e) => {
                                        setDescription(e.target.value);
                                    }} />
                                    <Form.Text className="text-muted">
                                        Please Describe the incident briefly in minimum 30 words
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <Modal show={showDialog} onHide={handleClose} centered size="sm" >
                                <Modal.Header closeButton>
                                    <Modal.Title>Message</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{message}</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleClose}>
                                        Ok
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </React.Fragment>
                        )
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default Report
