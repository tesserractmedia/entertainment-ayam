import React from 'react'
import { Container, Form, Col, Row, Button, Card, InputGroup } from 'react-bootstrap'
import { BsArrowClockwise, BsSearch } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Search() {
    const [title, setTitle] = React.useState("");
    const [year, setYear] = React.useState(0);
    const [category, setCategory] = React.useState("all");
    const [season, setSeason] = React.useState(0);
    const [episode, setEpisode] = React.useState(0);
    const [sort, setSort] = React.useState('title');

    const [result, setResult] = React.useState(null);
    const [info, setInfo] = React.useState(null);

    let navigate = useNavigate();

    const setDefault = () => {
        setTitle("");
        setYear(0);
        setCategory("all");
        setSeason(0);
        setEpisode(0);
        setSort("title");
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

    const search = (e,page) => {
        const params = { "sort": sort };
        console.log(page)
        if (page !== null) { params["page"] = page }
        if (title !== "") { params["title"] = title };
        if (category !== "all") { params["category"] = category };
        if (year !== 0 && year !== "0") { params["year"] = year };
        if (season !== 0) { params["season"] = season };
        if (episode !== 0) { params["episode"] = episode };

        axios.get('http://127.0.0.1:8000/api/v1/content', {
            params: params
        }).then((response) => {
            if (response.data["status"] === "success") {
                setResult(response.data["data"]);
                setInfo(response.data["info"]);
            }
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
                                    <Button>Prev</Button>
                                    <h6>Total Search Result: {info["total_rows"]}</h6>
                                    <Button>Next</Button>
                                </Col> : <React.Fragment></React.Fragment>
                        }
                    </Row>
                    <hr />
                    {
                        result !== null ?
                            < Row xs={1} lg={6} className="g-4">
                                {result.map((item) => (
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{item["title"]}</Card.Title>
                                                <Card.Text>
                                                    {item["year"]}
                                                    <p> {item["report"]}</p>
                                                    <Button data-id={item["id"]} onClick={onClickContent}>Check</Button>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row> : <Row className='text-center'>"Nothing Found!"</Row>
                    }
                </Col>
            </Row >
        </Container >
    )
}

export default Search
