import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Popconfirm,
  Space,
  Card,
  Statistic
} from 'antd';
import {
  PlusCircle,
  Package,
  DollarSign,
  BarChart3,
  Edit,
  Trash2
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { Product } from '../types';

const { Content } = Layout;
const { Title } = Typography;

export const Admin: React.FC = () => {
  const { token } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingId) {
        await axios.put(`http://localhost:3000/api/products/${editingId}`, values, config);
        message.success('Product updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/products', values, config);
        message.success('Product added successfully');
      }

      setModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    form.setFieldsValue(product);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="product" className="w-16 h-16 object-cover rounded" />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="text"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Delete product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<Trash2 className="w-4 h-4" />}
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: <Package className="w-8 h-8 text-blue-500" />
    },
    {
      title: 'Total Value',
      value: `$${products.reduce((acc, curr) => acc + curr.price * curr.stock, 0).toFixed(2)}`,
      icon: <DollarSign className="w-8 h-8 text-green-500" />
    },
    {
      title: 'Low Stock Items',
      value: products.filter(p => p.stock < 10).length,
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />
    }
  ];

  return (
    <Content className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Product Management</Title>
          <Button
            type="primary"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => {
              setEditingId(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-center">
                {stat.icon}
                <div className="ml-4">
                  <p className="text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title={editingId ? 'Edit Product' : 'Add New Product'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              min={0}
              precision={2}
              prefix="$"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select>
              <Select.Option value="electronics">Electronics</Select.Option>
              <Select.Option value="fashion">Fashion</Select.Option>
              <Select.Option value="home">Home & Living</Select.Option>
              <Select.Option value="books">Books</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter image URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};