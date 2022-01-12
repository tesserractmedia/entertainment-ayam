import faker from 'faker';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const option = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    },
  },
  scales: {
    x: {
      grid: {
        drawBorder: false,
      }
    },
    y: {
      grid: { drawBorder: false, }
    }
  }
}



function Home() {

  return (
    <Container>
      <h2 className='text-center my-5'>Title</h2>
      <Row>
        <Col lg={8}>
          This is the Website of Entertainment Ayam a sub-project and part of the Ayam Project ecosystem. This project's aim is to collect data on Hinduphobia being spread through entertainment mediums. No personal details are collected on this website. Here you report Hinduphobia and can also see the data in form of charts and graphs.
        </Col>
        <Col lg={4}>

        </Col>
      </Row>
    </Container>
  )
}

export default Home
