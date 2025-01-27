/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomNumberInput from "@/components/form/CustomNumberInput";
import CustomTextArea from "@/components/form/CustomTextArea";
import { useGetSingleProductQuery } from "@/redux/features/admin/productManagement.api";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { orderSchema } from "@/schemas/orderSchema";
import { TProduct, TResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, Spin, Tag, Card, Typography } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import NotificationToast from "@/components/ui/NotificationToast";
import { useCreateOrderMutation } from "@/redux/features/order/orderManagement.api";

const { Title } = Typography;

export default function Checkout() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const { data: getUserData } = useGetUserQuery(user?.email, {
    refetchOnMountOrArgChange: true,
    skip: !user,
  });
  const { data, isFetching } = useGetSingleProductQuery(productId);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const product = data?.data as TProduct;
  const totalPrice = product?.price * quantity;

  const handleOrder: SubmitHandler<FieldValues> =async (data) => {
    NotificationToast({
      message: "Ordering product...",
      type: "loading",
      toastId: "1",
    });

    const orderData = {
      product: product?._id,
      user: getUserData?.data?._id,
      quantity: data?.quantity,
      address: data?.address,
      email: user?.email,
      totalPrice: totalPrice,
    };
    try {
      const res = (await createOrder(orderData)) as TResponse<any>;
      if (res.data) {
        NotificationToast({
          message: "Order Created successfully",
          type: "success",
          toastId: "2",
          destroyId: "1",
        });
      } else if (res.error) {
        NotificationToast({
          message: res.error.data.message,
          type: "error",
          toastId: "2",
          destroyId: "1",
        });
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div className="p-6">
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
        Go Back
      </Button>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <Title level={2} className="text-center mb-6">
          Checkout
        </Title>
        <CustomForm
          onSubmit={handleOrder}
          resolver={zodResolver(orderSchema)}
          defaultValues={{
            name: product?.name,
            price: product?.price,
            email: user?.email,
            quantity: 1,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <CustomInput
                type="text"
                readonly
                name="name"
                label="Name of Bike"
              />
            </Col>
            <Col span={12}>
              <CustomNumberInput readonly name="price" label="Price" />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <CustomNumberInput
                name="quantity"
                label={`Quantity Available: ${product?.quantity}`}
                onChange={(value) => {
                  setQuantity(value || 1);
                }}
                max={product?.quantity}
                min={1}
              />
            </Col>
            <Col span={12}>
              <CustomInput
                type="text"
                readonly
                name="email"
                label="User Email"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <CustomTextArea name="address" label="User Address" />
            </Col>
          </Row>

          <div className="flex flex-col justify-end gap-x-2 mt-6">
            <Title level={4} className="text-end">
              <Tag color="blue" className="text-lg">
                Total Price: {totalPrice} $
              </Tag>
            </Title>
            <div className="flex justify-end gap-x-2">
              <Button type="primary" htmlType="submit" size="large">
                Order Now
              </Button>
            </div>
          </div>
        </CustomForm>
      </Card>
    </div>
  );
}
