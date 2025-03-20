import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Form, Input, Button, Checkbox, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Add login logic here
      console.log('Login attempt:', values);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f0f2f5',
      padding: '20px'
    }}>
      <Card style={{ maxWidth: 400, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <LogIn size={48} style={{ color: '#1890ff' }} />
          <Title level={2} style={{ marginTop: 24 }}>Sign in to your account</Title>
          <Text type="secondary">
            Or <Link to="/register" style={{ color: '#1890ff' }}>create a new account</Link>
          </Text>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Checkbox>Remember me</Checkbox>
              <Link to="/forgot-password" style={{ color: '#1890ff' }}>
                Forgot password?
              </Link>
            </Space>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};