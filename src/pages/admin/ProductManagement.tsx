/* eslint-disable @typescript-eslint/no-explicit-any */
import AddProductModal from "@/components/modal/AddProductModal";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/admin/productManagement.api";
import { TProduct, TQueryParams, TResponse } from "@/types";
import {
  Card,
  Empty,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import {
  DollarCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import NotificationToast from "@/components/ui/NotificationToast";
import ConfirmToast from "@/components/ui/ConfirmToast";
import EditProductModal from "@/components/modal/EditProductModal";
export default function ProductManagement() {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: productsData, isFetching } = useGetAllProductsQuery([
    ...params,
    { name: "limit", value: "10" },
  ]);
  const [deleteProduct] = useDeleteProductMutation();
  const handleDelete = async (id: string) => {
    NotificationToast({
      message: "Deleting product...",
      type: "loading",
      toastId: "loading",
    });

    try {
      const res = (await deleteProduct(id)) as TResponse<any>;
      if (res.data) {
        NotificationToast({
          message: "Product deleted successfully",
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

  const tableData = productsData?.data?.map((product: TProduct) => ({
    key: product._id,
    _id: product._id,
    name: product.name,
    price: product.price,
    category: product.category,
    brand: product.brand,
    quantity: product.quantity,
    image: product.image,
    description: product.description,
  }));
  const columns: TableColumnsType<TProduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p className="font-medium text-gray-700">{text}</p>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Tag color="gold">
          <DollarCircleOutlined /> ${price}
        </Tag>
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
      title: "Actions",
      key: "actions",
      render: (record) => {
        return (
          <div className="flex gap-2">
            <EditProductModal product={record} management={true} />
            <ConfirmToast
              buttonText="Delete"
              onConfirm={() => handleDelete(record.key)}
              title="Delete Product"
              description="Are you sure you want to delete this product?"
              danger={true}
            />
          </div>
        );
      },
    },
  ];
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  if (productsData?.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          styles={{ image: { height: 200 } }}
          description={
            <Typography.Text type="secondary" className="text-lg">
              No Products Found
            </Typography.Text>
          }
        />
      </div>
    );
  }
  return (
    <div>
      <Card className="shadow-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Manage Products
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Manage all my products
          </p>
          <div className="flex justify-end my-5 mr-5">
            <AddProductModal />
          </div>
        </div>

        <Table<TProduct>
          columns={columns}
          dataSource={tableData}
          style={{ overflow: "auto" }}
          pagination={{
            current: productsData?.meta?.page,
            total: productsData?.meta?.totalDocuments,
            pageSize: productsData?.meta?.limit,
            onChange: (newPage, pageSize) => {
              const existingParams = params.filter(
                (param) => param.name !== "page" && param.name !== "limit"
              );
              setParams([
                ...existingParams,
                { name: "page", value: newPage.toString() },
                { name: "limit", value: pageSize.toString() },
              ]);
            },
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} products`,
            showSizeChanger: true,
          }}
          className="shadow-sm"
          bordered
        />
      </Card>
    </div>
  );
}
