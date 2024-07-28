// src/components/EarnChart.js
import React from 'react';
import { Card } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EarnChart = ({ data }) => {
  const calculateDailyGains = () => {
    if (data.length === 0) return [];

    const formattedData = data.map(entry => ({
      date: entry.date,
      orca: entry.orca.reward,
      raydium: entry.raydium.reward,
      meteora: entry.meteora.reward
    }));

    // Calculer les gains journaliers
    const gainsData = formattedData.reduce((acc, current, index, array) => {
      if (index === 0) {
        // Le premier jour n'a pas de gain, on le laisse à zéro
        acc.push({
          date: current.date,
          orca: 0,
          raydium: 0,
          meteora: 0
        });
      } else {
        const previous = array[index - 1];
        acc.push({
          date: current.date,
          orca: Math.max(current.orca - previous.orca, 0),
          raydium: Math.max(current.raydium - previous.raydium, 0),
          meteora: Math.max(current.meteora - previous.meteora, 0)
        });
      }
      return acc;
    }, []);

    return gainsData;
  };

  const formatCurrency = (value) => {
    return `$${value.toFixed(5)}`;
  };

  return (
    <Card>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={calculateDailyGains()}>
            <Line type="monotone" dataKey="orca" stroke="#8884d8" />
            <Line type="monotone" dataKey="raydium" stroke="#82ca9d" />
            <Line type="monotone" dataKey="meteora" stroke="#ffc658" />
            <CartesianGrid stroke="#6e6e6e" />
            <XAxis dataKey="date" stroke="#6e6e6e" />
            <YAxis stroke="#6e6e6e" />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default EarnChart;
