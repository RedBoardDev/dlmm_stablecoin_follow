// src/components/StatisticsCards.js
import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

const StatisticsCards = ({ data }) => {
  if (data.length === 0) {
    return null;
  }

  const latestData = data[data.length - 1];
  const pools = ['orca', 'raydium', 'meteora'];
  const bestPerformingPool = pools.reduce((bestPool, currentPool) => {
    return latestData[currentPool].reward > latestData[bestPool].reward ? currentPool : bestPool;
  }, 'orca');

  const experienceDays = data.length;
  const lastUpdatedDate = latestData.date;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
      <Col span={8}>
        <Card>
        <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: '10px', color: '#000' }}>{bestPerformingPool.charAt(0).toUpperCase() + bestPerformingPool.slice(1)}</Title>
            <div>
              <Text type="secondary">Meilleure pool actuellement</Text><br />
              <Text type="secondary">Basé sur les rewards uniquement</Text>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: '10px', color: '#000' }}>{experienceDays} days</Title>
            <div>
              <Text type="secondary">Nombre de jours passés</Text><br />
              <Text type="secondary">depuis le début de l'experience</Text>
              </div>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
        <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: '10px', color: '#000' }}>{moment(lastUpdatedDate).format('YYYY-MM-DD')}</Title>
            <div>
              <Text type="secondary">Dernière update des données</Text><br />
              <Text type="warning">Données actualisées tous les jours entre 23h00 et 00:00</Text>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsCards;
