import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Space } from 'antd';
import { ShoppingCart, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const { Header } = Layout;

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <Header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EShop
        </Link>
        
        <Menu mode="horizontal" className="flex-1 justify-center border-0">
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="products">
            <Link to="/products">Products</Link>
          </Menu.Item>
          {user?.role === 'admin' && (
            <Menu.Item key="admin">
              <Link to="/admin">Admin Dashboard</Link>
            </Menu.Item>
          )}
        </Menu>

        <Space>
          <Link to="/cart">
            <Button type="text" icon={<ShoppingCart className="w-5 h-5" />} />
          </Link>
          {user ? (
            <Space>
              <span>Welcome, {user.name}</span>
              <Button onClick={logout}>Logout</Button>
            </Space>
          ) : (
            <Space>
              <Link to="/login">
                <Button type="text" icon={<User className="w-5 h-5" />}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Register</Button>
              </Link>
            </Space>
          )}
        </Space>
      </div>
    </Header>
  );
};