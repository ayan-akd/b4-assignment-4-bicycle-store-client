import AddProductModal from "@/components/modal/AddProductModal";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TProduct, TQueryParams } from "@/types";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Spin } from "antd";

export default function ProductManagement() {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data: productsData, isFetching } = useGetAllProductsQuery([
    ...params,
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "searchTerm", value: searchTerm },
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
        <div className="md:flex flex-wrap gap-5 justify-center space-y-4 md:space-y-0  items-center">
          {productsData?.data?.map((product: TProduct) => (
            <ProductCard
              key={product?._id}
              product={product}
              management={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
