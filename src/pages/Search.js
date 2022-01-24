import React from 'react'
import { Container, Form, Col, Row, Button, Card, InputGroup, Spinner,Modal } from 'react-bootstrap'
import { BsArrowClockwise, BsSearch } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Search() {

    const [loading, setLoading] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [year, setYear] = React.useState(0);
    const [category, setCategory] = React.useState("all");
    const [season, setSeason] = React.useState(0);
    const [episode, setEpisode] = React.useState(0);
    const [sort, setSort] = React.useState('');


    const [showDialog,setShowDialog] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const [result, setResult] = React.useState(null);
    const [info, setInfo] = React.useState(null);

    let navigate = useNavigate();

    const setDefault = () => {
        setTitle("");
        setYear(0);
        setCategory("all");
        setSeason(0);
        setEpisode(0);
        setSort("");
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

    const search = (e) => {
        const params = {};
        const page = e.target.getAttribute("data-page");
        if (sort !== "") { params["sort"] = sort };
        if (page !== null) { params["page"] = page }
        if (title !== "") { params["name"] = title };
        if (category !== "all") { params["category"] = category };
        if (year !== 0 && year !== "0") { params["year"] = year };
        if (season !== 0) { params["season"] = season };
        if (episode !== 0) { params["episode"] = episode };

        setLoading(true);

        axios.get('https://entertainment-ayam.herokuapp.com/api/v1/content', {
            params: params
        }).then((response) => {
            if (response.data["success"] === true) {
                setResult(response.data["data"]);
                setInfo(response.data["info"]);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }).catch((error) => {
            setLoading(false);
            setShowDialog(true);
            setMessage(error.response.data["message"]);
        });
    }


    const onClickContent = (e) => {
        let id = e.target.getAttribute("data-id");
        console.log(id)
        navigate(`/content/${id}`);
    }

    return (
        <Container className='py-3'>
            <Row className='justify-content-center'>
                <                Col lg={8}>
                    <h3 className='text-center'>Search Content</h3>
                    <Form>
                        <Row>
                            <InputGroup as={Col} xs sm md lg xl={10} className='mb-3' controlId='formTitle'>
                                <Form.Control placeholder='Enter the content name' value={title} maxLength={100} minLength={1} onChange={(e) => {

                                    setTitle(e.target.value)

                                }} />
                                <Button onClick={search}>
                                    <BsSearch />
                                </Button>
                                <Button onClick={setDefault}>
                                    <BsArrowClockwise />
                                </Button>
                            </InputGroup>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formYear">
                                <Form.Label>Release Year</Form.Label>
                                <Form.Select value={year} onChange={(e) => {
                                    setYear(e.target.value);
                                }}>
                                    <option value={0}>None</option>
                                    {
                                        range(new Date().getFullYear(), 1900).map((item) => {
                                            return <option value={item}>{item}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Select value={category} onChange={(e) => {
                                    setCategory(e.target.value);
                                }}>
                                    <option value="all">All</option>
                                    <option value="movie">Movie</option>
                                    <option value="web series">Web Series</option>
                                    <option value="documentary">Documentary</option>
                                    <option value="song">Song</option>
                                    <option value="serial">Serial</option>
                                    <option value="other">Other</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formSeason">
                                <Form.Label>Season</Form.Label>
                                <Form.Control type='number' pattern="[0-9]*" min={0} value={season}
                                    onChange={(e) => {
                                        if (e.target.validity.valid) {
                                            setSeason(e.target.value);
                                        } else {
                                            setSeason(null);
                                        }
                                    }} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formEpisode">
                                <Form.Label>Episode</Form.Label>
                                <Form.Control type='number' pattern="[0-9]*" min={0} value={episode}
                                    onChange={(e) => {
                                        if (e.target.validity.valid) {
                                            setEpisode(e.target.value);
                                        } else {
                                            setEpisode(null);
                                        }
                                    }} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formSort">
                                <Form.Label>Sort By</Form.Label>
                                <Form.Select value={sort} onChange={(e) => {
                                    setSort(e.target.value);
                                }}>
                                    <option value="title">Title</option>
                                    <option value="year">Year</option>
                                    <option value="season">Season</option>
                                    <option value="episode">Episode</option>
                                    <option value="report">Report</option>
                                    <option value="">None</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={8}>
                    <Row>
                        {
                            info !== null ?
                                <Col className='d-flex justify-content-between'>
                                    <Button  size="sm" data-page={info["previous_page"]} onClick={search}>Prev</Button>
                                    <h6> Total Rows On Page: {info["total_rows"]}</h6>
                                    <h6>Page {info["current_page"]} of {info["total_pages"]}</h6>
                                    <Button size="sm"  data-page={info["next_page"]} onClick={search}>Next</Button>
                                </Col> : <React.Fragment></React.Fragment>
                        }
                    </Row>
                    <hr />

                    {
                        loading === false ? result !== null ?
                            <React.Fragment>{result.map((item) => (
                                <Card className='m-1 shadow-sm'>
                                    <Card.Body>
                                        <Card.Title>{item["title"]}</Card.Title>
                                        <Card.Text>
                                            <span>{item["year"]}</span><br />
                                            <span>Reports: {item["report"]}</span>
                                        </Card.Text>
                                        <Button size="sm" data-id={item["id"]} onClick={onClickContent}>Check</Button>
                                    </Card.Body>
                                </Card>
                            ))}</React.Fragment>
                            : <Row className='text-center'><span>"Nothing to show!"</span></Row> : <Row className='d-flex justify-content-center p-5'><Spinner variant='primary' animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></Row>
                    }
                </Col>
            </Row >
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
        </Container >
    )
}

export default Search
