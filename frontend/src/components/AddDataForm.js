import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { apiUrl } from '../apiUrl';

const AddDataForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        date: values.date.format('YYYY-MM-DD'),
        raydium: {
          liquidity: parseFloat(values.raydium_liquidity),
          reward: parseFloat(values.raydium_reward),
          apr: parseFloat(values.raydium_apr)
        },
        meteora: {
          liquidity: parseFloat(values.meteora_liquidity),
          reward: parseFloat(values.meteora_reward),
          apr: parseFloat(values.meteora_apr)
        },
        orca: {
          liquidity: parseFloat(values.orca_liquidity),
          reward: parseFloat(values.orca_reward),
          apr: parseFloat(values.orca_apr)
        }
      };

      await axios.put(`${apiUrl}stablecoin`, formattedValues);
      message.success('Data added successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to add data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 800, width: '100%' }}
        initialValues={{
          date: moment(),
        }}
      >
        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date!' }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="orca_liquidity" label="Orca Liquidity" rules={[{ required: true, message: 'Please input Orca Liquidity!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="orca_reward" label="Orca Reward" rules={[{ required: true, message: 'Please input Orca Reward!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="orca_apr" label="Orca APR" rules={[{ required: true, message: 'Please input Orca APR!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="raydium_liquidity" label="Raydium Liquidity" rules={[{ required: true, message: 'Please input Raydium Liquidity!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="raydium_reward" label="Raydium Reward" rules={[{ required: true, message: 'Please input Raydium Reward!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="raydium_apr" label="Raydium APR" rules={[{ required: true, message: 'Please input Raydium APR!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="meteora_liquidity" label="Meteora Liquidity" rules={[{ required: true, message: 'Please input Meteora Liquidity!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="meteora_reward" label="Meteora Reward" rules={[{ required: true, message: 'Please input Meteora Reward!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="meteora_apr" label="Meteora APR" rules={[{ required: true, message: 'Please input Meteora APR!' }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Add Data
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDataForm;
