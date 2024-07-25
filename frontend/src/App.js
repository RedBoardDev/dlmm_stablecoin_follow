import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Typography, Row, Col, Card } from 'antd';
import LiquidityChart from './components/LiquidityChart';
import RewardChart from './components/RewardChart';
import EarnChart from './components/EarnChart';

const { Title } = Typography;
const { Header, Content } = Layout;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/stablecoin')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: '0 20px' }}>
        <Title style={{ color: '#fff' }}>Suivi du test des pools stablecoin</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
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
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
