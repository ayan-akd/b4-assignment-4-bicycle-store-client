import { useGetSingleProductQuery } from "@/redux/features/admin/productManagement.api";
import {
  Spin,
  Row,
  Col,
  Typography,
  Divider,
  Image,
  Card,
  Tag,
  Button,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  ToolOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import EditProductModal from "@/components/modal/EditProductModal";

const { Title, Text, Paragraph } = Typography;

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const { data, isFetching } = useGetSingleProductQuery(productId);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const product = data?.data;
  const { name, price, image, description, category, _id, quantity } = product;

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div className="container mx-auto">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          size="large"
          style={{
            marginBottom: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          Back to Products
        </Button>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src={image}
                alt={name}
                style={{
                  borderRadius: "16px",
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <Tag
                color={quantity > 0 ? "blue" : "red"}
                icon={
                  quantity > 0 ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
                style={{
                  padding: "4px 12px",
                  borderRadius: "99px",
                  marginBottom: "16px",
                }}
              >
                {quantity > 0 ? "In Stock" : "Out of Stock"}
              </Tag>

              <Title level={1} style={{ marginBottom: "16px" }}>
                {name}
              </Title>
              <Tag color="green" className="mb-2">
                {category}
              </Tag>

              <Title
                level={2}
                type="success"
                style={{ color: "#389e0d", marginBottom: "24px" }}
              >
                ${price}
              </Title>

              <Divider />

              <Title level={4}>Product Description</Title>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#666",
                }}
              >
                {description}
              </Paragraph>

              <Divider />

              <div className="features" style={{ marginBottom: "24px" }}>
                <Title level={4}>Premium Features</Title>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card size="small" style={{ borderRadius: "12px" }}>
                      <SafetyCertificateOutlined
                        style={{
                          color: "#52c41a",
                          fontSize: "20px",
                          marginRight: "12px",
                        }}
                      />
                      Premium Quality Materials & Craftsmanship
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card size="small" style={{ borderRadius: "12px" }}>
                      <RocketOutlined
                        style={{
                          color: "#1890ff",
                          fontSize: "20px",
                          marginRight: "12px",
                        }}
                      />
                      Professional Grade Components
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card size="small" style={{ borderRadius: "12px" }}>
                      <ToolOutlined
                        style={{
                          color: "#faad14",
                          fontSize: "20px",
                          marginRight: "12px",
                        }}
                      />
                      Comprehensive 1 Year Warranty
                    </Card>
                  </Col>
                </Row>
              </div>

              <div
                style={{
                  background: "#f6ffed",
                  padding: "16px",
                  borderRadius: "12px",
                }}
              >
                <Text>
                  <ShoppingCartOutlined
                    style={{ marginRight: "8px", color: "#52c41a" }}
                  />
                  Free Premium Shipping & Assembly Available
                </Text>
              </div>
              <div className="flex flex-col gap-2">
                {
                  user?.role === "customer" && (
                    <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  style={{ marginTop: "24px" }}
                  onClick={() => navigate(`/checkout/${_id}`)}
                  disabled={quantity === 0}
                >
                  {quantity > 0 ? "Buy Now" : "Out of Stock"}
                </Button>
                  )
                }
                {user?.role === "admin" && (
                  <EditProductModal product={product} />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
