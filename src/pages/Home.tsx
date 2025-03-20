import React from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-xl overflow-hidden mb-16">
        <img
          src="https://intphcm.com/data/upload/banner-thoi-trang-tuoi.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4">
            <Title className="text-white mb-4">Welcome to DUYLONG Shop</Title>
            <Paragraph className="text-white text-lg mb-8">
            Khám phá những sản phẩm tuyệt vời với giá không thể tốt hơn
            </Paragraph>
            <Link to="/products">
              <Button type="primary" size="large">
                Shop Now <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <Title level={2} className="mb-8">Danh mục nổi bật</Title>
      <Row gutter={[24, 24]} className="mb-16">
        {['Điện tử', 'Thời trang', 'Nhà cửa & Đời sống', 'Sách'].map((category) => (
          <Col xs={24} sm={12} md={6} key={category}>
            <Card
              hoverable
              cover={
                <img
                  alt={category}
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM20RaxbjX6IuimiQWeSPqx8kGS6hO1AE4pQ&s/400x300/?${category.toLowerCase()}`}
                  className="h-48 object-cover"
                />
              }
            >
              <Card.Meta title={category} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Why Choose Us */}
      <Title level={2} className="mb-8">Tại sao chọn chúng tôi</Title>
      <Row gutter={[24, 24]}>
        {[
          {
            title: 'Miễn phí vận chuyển',
            description: 'Miễn phí vận chuyển cho đơn hàng trên 100k100k',
          },
          {
            title: 'Hỗ trợ 24/77',
            description: 'Hỗ trợ khách hàng 24/77',
          },
          {
            title: 'Thanh toán an toàntoàn',
            description: '100% nhận hàng rồi mới thanh toántoán',
          },
          {
            title: 'Đảm bảo hoàn tiềntiền',
            description: 'Hoàn tiền trong vòng 30 ngày',
          },
        ].map((item) => (
          <Col xs={24} sm={12} md={6} key={item.title}>
            <Card className="text-center">
              <Title level={4}>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};