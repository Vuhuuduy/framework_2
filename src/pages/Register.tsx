import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

export const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Add registration logic here
      console.log('Registration attempt:', values);
    } catch (error) {
      console.error('Registration failed:', error);
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
          <UserPlus size={48} style={{ color: '#1890ff' }} />
          <Title level={2} style={{ marginTop: 24 }}>Create your account</Title>
          <Text type="secondary">
            Already have an account? <Link to="/login" style={{ color: '#1890ff' }}>Sign in</Link>
          </Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

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
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};