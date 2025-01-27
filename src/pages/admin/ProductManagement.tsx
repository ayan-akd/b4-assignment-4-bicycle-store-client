import AddProductModal from "@/components/modal/AddProductModal";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TProduct, TQueryParams } from "@/types";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Pagination, Spin } from "antd";

export default function ProductManagement() {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: productsData, isFetching } = useGetAllProductsQuery([
    ...params,
    { name: "limit", value: "8" },
  ]);

  return (
    <div>
      <h1 className="text-center text-4xl font-bold">Manage Products</h1>
      <div className="flex justify-end my-5 mr-5">
        <AddProductModal />
      </div>
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
        <div className="md:flex flex-wrap gap-5 justify-center space-y-4 md:space-y-0  items-center">
          {productsData?.data?.map((product: TProduct) => (
            <ProductCard
              key={product?._id}
              product={product}
              management={true}
            />
          ))}
        </div>
        <div className="flex justify-center my-8">
            <Pagination
              current={productsData?.meta?.page}
              total={productsData?.meta?.totalDocuments}
              pageSize={productsData?.meta?.limit}
              onChange={(newPage) => setParams([{ name: "page", value: newPage.toString() }])}
              showSizeChanger={false}
            />
          </div>
        </>
        
      )}
    </div>
  );
}
