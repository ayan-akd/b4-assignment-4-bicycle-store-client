/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderManagement.api";
import { TOrder } from "@/types/order.type";
import {
  Empty,
  Spin,
  Table,
  TableColumnsType,
  Typography,
  Card,
  Tag,
  Dropdown,
  Button,
} from "antd";
import { DollarCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import NotificationToast from "@/components/ui/NotificationToast";
import { TResponse } from "@/types";

const statusItems = [
  {
    label: "Pending",
    key: "pending",
  },
  {
    label: "Processing",
    key: "processing",
  },
  {
    label: "Shipped",
    key: "shipped",
  },
  {
    label: "Delivered",
    key: "delivered",
  },
  {
    label: "Cancelled",
    key: "cancelled",
  },
];

export default function OrderManagement() {
  const [orderId, setOrderId] = useState("");
  const { data: ordersData, isFetching } = useGetAllOrdersQuery(undefined);
  const [updateStatus] = useUpdateOrderStatusMutation();
  const tableData = ordersData?.data?.map((order: TOrder) => ({
    key: order._id,
    _id: order._id,
    orderId: order.orderId,
    customer: order.user.name,
    lPrice: order.totalPrice,
    quantity: order.quantity,
    product: order.product.name,
    status: order.status,
  }));

  const handleStatusChange = async ( value: any) => {
    NotificationToast({
      message: "Updating Order status...",
      type: "loading",
      toastId: "loading",
    });
    const updatedData = {
      id: orderId,
      data: {
        status: value.key,
      },
    };
    try {
      const res = (await updateStatus(updatedData)) as TResponse<any>;
      if (res.data) {
        NotificationToast({
          message: "Order status updated successfully",
          type: "success",
          toastId: "2",
          destroyId: "loading",
        });
      } else if (res.error) {
        NotificationToast({
          message: res.error.data.message,
          type: "error",
          toastId: "2",
          destroyId: "loading",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const menuProps = {
    items: statusItems,
    onClick: handleStatusChange,
  };

  const columns: TableColumnsType<TOrder> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => (
        <Tag color="blue">
          <code>{text}</code>
        </Tag>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <Tag color="green">
          <ShoppingOutlined /> {quantity}
        </Tag>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "lPrice",
      key: "lPrice",
      render: (price) => (
        <Tag color="gold">
          <DollarCircleOutlined /> ${price}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          pending: "orange",
          processing: "blue",
          shipped: "cyan",
          delivered: "green",
          cancelled: "red",
        };
        return (
          <Tag color={statusColors[status as keyof typeof statusColors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      render: (record) => (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setOrderId(record.key)}
            className="hover:opacity-90"
          >
            Update
          </Button>
        </Dropdown>
      ),
    },
  ];

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (ordersData?.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          styles={{ image: { height: 200 } }}
          description={
            <Typography.Text type="secondary" className="text-lg">
              No Orders Found
            </Typography.Text>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="shadow-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Order Management
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Manage and track all customer orders
          </p>
        </div>

        <Table<TOrder>
          columns={columns}
          dataSource={tableData}
          style={{ overflow: "auto" }}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          className="shadow-sm"
          bordered
        />
      </Card>
    </div>
  );
}
