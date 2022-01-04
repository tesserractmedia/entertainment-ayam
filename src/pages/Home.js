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
import { Line, Doughnut } from 'react-chartjs-2';

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

//ChartJS.defaults.scale.grid.drawOnChartArea = false;
export const options = {
  plugins: {
    title: {
        display: true,
        text: 'Hinduphobia Incidents Reported'
    }
},
  responsive: true,
  scales : {
    x: {
      grid: {
        drawOnChartArea: false
      }
    },
    y: {
      grid: {
        drawOnChartArea: false
      }
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data_l = {
  labels,
  datasets: [
    {
      label: 'Incidents',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132,1)',
      tension: 0.5
    },
  ],
};


export const data_d = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function Home() {

  return (
    <div>
      <Container>
        <Row>
        <h2 className='text-center my-5'></h2>
        </Row>
        <Row>
          <Col lg={8}>
            <h3></h3>
            <Line options={options} data={data_l} />
          </Col>
          <Col lg={4}>
            {/*<Doughnut data={data_d} />*/}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
