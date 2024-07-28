// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Typography, Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';
import LiquidityChart from './components/LiquidityChart';
import RewardChart from './components/RewardChart';
import EarnChart from './components/EarnChart';
import AddDataForm from './components/AddDataForm';
import { apiUrl } from './apiUrl';
import PercentChart from './components/PercentChart';
import StatisticsCards from './components/StatisticsCards';

const { Title } = Typography;
const { Header, Content } = Layout;

const App = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get(`${apiUrl}stablecoin`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const isAddPage = location.hash === '#add';

  return (
    <Layout style={{ minHeight: '100vh' }}>
     <Header style={{ padding: '0 20px' }}>
        <Title level={2} style={{ color: 'black', marginBottom: '0.5rem' }}>
          Suivi du test des pools stablecoin
        </Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        {isAddPage ? (
          <AddDataForm />
        ) : (
          <>
          <StatisticsCards data={data} />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={2} style={{ textAlign: 'center' }}>Comparaison de la liquidité</Title>
              <LiquidityChart data={data} />
            </Col>
            <Col span={24}>
              <Title level={2} style={{ textAlign: 'center' }}>Comparaison des gains accumulés</Title>
              <RewardChart data={data} />
            </Col>
            <Col span={24}>
              <Title level={2} style={{ textAlign: 'center' }}>Comparaison des gains réalisés</Title>
              <EarnChart data={data} />
            </Col>
            <Col span={24}>
              <Title level={2} style={{ textAlign: 'center' }}>Comparaison des pourcentages (daily APR)</Title>
              <PercentChart data={data} />
            </Col>
          </Row>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default App;
