import React from 'react'
import { Card, Container, Spinner, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound';
import axios from 'axios'

function Content() {
    const [content, setContent] = React.useState(null);
    const [report, setReport] = React.useState(null);

    let { id } = useParams();

    React.useEffect(() => {

        if (id === undefined) {
            setContent(null);

        } else {
            axios.get(`https://entertainment-ayam.herokuapp.com/api/v1/content/${id}`).then((response) => {
                if (response.data["success"] === true) {
                    setContent(response.data["data"]);
                } else {
                    setContent(null);
                }
            });

            axios.get(`https://entertainment-ayam.herokuapp.com/api/v1/report?content_id=${id}`).then((response) => {
                if (response.data["success"] === true) {
                    setReport(response.data["data"])
                } else {
                    setReport(null);
                }
            })
        }
    }, []);

    return (
        content !== null && report !== null ? <Container className="py-3">
            <Row className="justify-content-center">
                <Col xs sm md lg xl={8}>
                    {content !== null ? <Card>
                        <Card.Body>
                            <Card.Title>
                                {content["title"]}
                            </Card.Title>
                            <Card.Text>
                                {content["year"]}
                                {content["category"]}
                                {content["season"]}
                                {content["episode"]}
                                {content["report"]}
                            </Card.Text>
                        </Card.Body>
                    </Card> : <Spinner className="m-5" variant="primary" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    }
                    <hr />
                    <Container>
                        {
                            report !== null ?
                                report.map((item) => {
                                    return <Card><Card.Body><Card.Title>Report Id {item["id"]}</Card.Title>
                                        <Card.Text>
                                            {item["description"]}
                                        </Card.Text>
                                    </Card.Body></Card>
                                })
                                : <Spinner className="m-5" variant="primary" animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                        }
                    </Container>
                </Col>
            </Row >
        </Container > : <NotFound />
    )
}

export default Content


