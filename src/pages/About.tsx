import { Typography, Row, Col, Card, Timeline, Space } from "antd";
import {
  ShopOutlined,
  TeamOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div style={{ padding: "2rem" }}>
      <Row justify="center" style={{ marginBottom: "3rem" }}>
        <Col>
          <Title className="text-center" level={1}>Welcome to Pedal Paradise</Title>
          <Paragraph style={{ fontSize: "1.2rem", textAlign: "center" }}>
            Your Premium Destination for All Things Bicycles Since 1995
          </Paragraph>
        </Col>
      </Row>
        <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={7}>
          <Card hoverable style={{ height: '100%' }}>
              <ShopOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
              <Title level={4}>Premium Selection</Title>
              <Paragraph style={{ height: '80px' }}>
                  Offering the finest collection of road, mountain, and urban bikes from top brands
              </Paragraph>
          </Card>
      </Col>
      <Col xs={24} md={7}>
          <Card hoverable style={{ height: '100%' }}>
              <TeamOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
              <Title level={4}>Expert Staff</Title>
              <Paragraph style={{ height: '80px' }}>
                  Our certified mechanics and sales team bring decades of cycling experience
              </Paragraph>
          </Card>
      </Col>
      <Col xs={24} md={7}>
          <Card hoverable style={{ height: '100%' }}>
              <SafetyCertificateOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
              <Title level={4}>Quality Service</Title>
              <Paragraph style={{ height: '80px' }}>
                  Professional maintenance, repairs, and customization services
              </Paragraph>
          </Card>
      </Col>
  </Row>

      <Row justify="center" style={{ marginTop: "4rem" }}>
        <Col xs={24} md={16}>
          <Title level={2}>Our Journey</Title>
          <Timeline
            items={[
              {
                color: "green",
                children: "1995 - Founded as a small repair shop",
              },
              {
                color: "green",
                children: "2000 - Expanded to full-service Pedal Paradise",
              },
              {
                color: "green",
                children: "2010 - Opened our flagship store",
              },
              {
                color: "blue",
                children:
                  "2023 - Celebrating serving over 100,000 happy cyclists",
              },
            ]}
          />
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: "4rem" }}>
        <Col xs={24} md={16}>
          <Card>
            <Title level={2}>Why Choose Us?</Title>
            <Space direction="vertical" size="middle">
              <Paragraph>
                <TrophyOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                Voted Best Bicycle Shop 5 years in a row
              </Paragraph>
              <Paragraph>
                <SafetyCertificateOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                Lifetime free maintenance on all new bikes
              </Paragraph>
              <Paragraph>
                <TeamOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                Community rides and events every month
              </Paragraph>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
