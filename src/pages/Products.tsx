import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Select, Spin, Alert } from 'antd';
import axios from 'axios';
import { Product } from '../types';

const { Search } = Input;

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Unable to load products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-8"
        />
      )}
      
      <div className="mb-8 flex gap-4">
        <Search
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
        <Select
          defaultValue="all"
          onChange={setCategory}
          className="w-48"
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'electronics', label: 'Electronics' },
            { value: 'fashion', label: 'Fashion' },
            { value: 'home', label: 'Home & Living' },
            { value: 'books', label: 'Books' },
          ]}
        />
      </div>

      <Row gutter={[24, 24]}>
        {filteredProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image}
                  className="h-48 object-cover"
                />
              }
            >
              <Card.Meta
                title={product.name}
                description={
                  <>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-lg font-semibold mt-2">${product.price}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};