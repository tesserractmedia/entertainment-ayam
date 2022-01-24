import React from 'react';
import { Row, Col, ButtonGroup } from 'react-bootstrap';
import { BsTwitter, BsYoutube, BsInstagram, BsFacebook } from 'react-icons/bs'

function Footer() {
    return <footer className='container'>
        <hr />
        <Row>
            <Col className='d-flex justify-content-around my-3'>
                <ButtonGroup>
                <a className='btn btn-outline-primary' href='https://twitter.com/TesserractMedia'><BsTwitter /></a>
                <a className='btn  btn-outline-primary' href='https://www.instagram.com/tesserractmedia/'> <BsInstagram /></a>
                <a className='btn  btn-outline-primary' href='https://www.youtube.com/channel/UCIyg-6uRfq77oI1tzX6eVIA'><BsYoutube /></a>
                <a className='btn btn-outline-primary' href='https://www.facebook.com/TesserractMedia'><BsFacebook /></a>
                </ButtonGroup>
            </Col>
        </Row>
        <Row>
            <Col className='text-center mb-2'>
                &copy; 2022-2022 by Tesserract Media. All Rights Reserved. Entertainment-Ayam is powered by Tesserract Media
            </Col>
        </Row>


    </footer>;
}

export default Footer;
