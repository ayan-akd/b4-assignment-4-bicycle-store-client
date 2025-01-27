/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row } from "antd";
import CustomForm from "../form/CustomForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../form/CustomInput";
import CustomSelect from "../form/CustomSelect";
import { categoryOptions } from "@/constants/productConstants";
import CustomTextArea from "../form/CustomTextArea";
import CustomNumberInput from "../form/CustomNumberInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/schemas/productSchema";
import { useUpdateProductMutation } from "@/redux/features/admin/productManagement.api";
import NotificationToast from "../ui/NotificationToast";
import { TProduct, TResponse } from "@/types";

export default function EditProductModal({ product }: { product: TProduct }) {
  const [open, setOpen] = useState(false);
  const [updateProduct] = useUpdateProductMutation();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    NotificationToast({
      message: "Updating  product...",
      type: "loading",
      toastId: "1",
    });

    const productData = {
      ...data,
      inStock: true,
    };

    try {
      const res = (await updateProduct({
        id: product._id,
        data: productData,
      })) as TResponse<any>;
      if (res.data) {
        NotificationToast({
          message: "Product updated successfully",
          type: "success",
          toastId: "2",
          destroyId: "1",
        });
        onClose();
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
    <>
      <Button
        type="primary"
        size="large"
        onClick={showDrawer}
        icon={<EditOutlined />}
      >
        Update Product
      </Button>
      <Drawer
        title="Update Product"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <CustomForm
          onSubmit={onSubmit}
          resolver={zodResolver(addProductSchema)}
          defaultValues={product}
        >
          <Row gutter={16}>
            <Col span={12}>
              <CustomInput
                name="name"
                label="Name"
                type="text"
                placeholder="Enter product name"
              />
            </Col>
            <Col span={12}>
              <CustomInput
                name="brand"
                label="Brand"
                type="text"
                placeholder="Enter brand name"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <CustomSelect
                name="category"
                label="Category"
                options={categoryOptions}
                placeholder="Enter category"
              />
            </Col>
            <Col span={8}>
              <CustomNumberInput
                name="price"
                label="Price"
                placeholder="Enter price"
              />
            </Col>
            <Col span={8}>
              <CustomNumberInput
                name="quantity"
                label="Quantity"
                placeholder="Enter quantity"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <CustomInput name="image" label="Image" type="text" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <CustomTextArea
                placeholder="Enter Description here..."
                name="description"
                label="Description"
              />
            </Col>
          </Row>
          <div className="flex justify-center gap-5 mt-5">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </CustomForm>
      </Drawer>
    </>
  );
}
