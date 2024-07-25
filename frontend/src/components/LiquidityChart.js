import React from 'react';
import { Card } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LiquidityChart = ({ data }) => {
  const formatDataForChart = () => {
    return data.map(entry => ({
      date: entry.date,
      orca: entry.orca.liquidity,
      raydium: entry.raydium.liquidity,
      meteora: entry.meteora.liquidity
    }));
  };

  return (
    <Card>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={formatDataForChart()}>
            <Line type="monotone" dataKey="orca" stroke="#8884d8" />
            <Line type="monotone" dataKey="raydium" stroke="#82ca9d" />
            <Line type="monotone" dataKey="meteora" stroke="#ffc658" />
            <CartesianGrid stroke="#6e6e6e" />
            <XAxis dataKey="date" stroke="#6e6e6e" />
            <YAxis stroke="#6e6e6e" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default LiquidityChart;
