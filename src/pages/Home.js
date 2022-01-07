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

const data_l = (canvas) => {

  const ctx = canvas.getContext("2d")
  var gradient = ctx.creaLinearGradient(0, 0, 500, 500);
  gradient.addColorStop(0, 'rgba(255,0,0,1)');
  gradient.addColorStop(1, 'rgba(255,0,0,0.5)')

  console.log(gradient)
  const labels = ["jan", "feb", "march"]
  return {
    labels: labels,
    datasets: [
      {
        label: 'Unfilled',
        data: [1, 2, 3],
        borderColor: "rgba(255,0,0,1)",
        backgroundColor: "rgba(10,,100,100,1)",
      }
    ]
  }
}

function Home() {

  return (
    <div>
      <Container>
        <Row>
          <h2 className='text-center my-5'>Title</h2>
        </Row>
        <Row>
          <Col lg={8}>
            <h3>Some Content</h3>

          </Col>
          <Col lg={4}>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
