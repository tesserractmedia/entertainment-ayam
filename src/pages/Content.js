import React from 'react'
import { Card, Container, Spinner, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound';
import axios from 'axios'

function Content() {
    const [loading, setLoading] = React.useState(true);
    const [content, setContent] = React.useState(false);
    const [data, setData] = React.useState({});

    let { id } = useParams();

    React.useEffect(() => {

        if (id === undefined) {
            setLoading(false);
            setContent(false);

        } else {
            axios.get(`https://entertainment-ayam.herokuapp.com/api/v1/content/${id}`).then((response) => {
                if (response.data["status"] === "success") {
                    setLoading(false);
                    setContent(true);
                    setData(response.data["data"]);
                } else {
                    setLoading(false);
                    setContent(false);
                }
            });
        }
    }, []);

    return (

        loading ? <Container className='flex-fill d-flex justify-content-center align-items-center'><Spinner className="m-5" variant="primary" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner></Container> : content ?
            <Container className="py-3">
                <Row className="justify-content-center">
                    <Col xs sm md lg xl={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {data["title"]}
                                </Card.Title>
                                <Card.Text>
                                    {data["year"]}
                                    {data["category"]}
                                    {data["season"]}
                                    {data["episode"]}
                                    {data["report"]}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Container> : <NotFound />
    )
}

export default Content
