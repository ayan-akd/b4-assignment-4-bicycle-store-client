import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TProduct, TQueryParams } from "@/types";
import { useState } from "react";
import ProductCard from "../admin/ProductCard";
import { Spin } from "antd";

export default function AllProducts() {
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
      <h1 className="text-center text-4xl mt-20 mb-10 font-bold">
        All Products
      </h1>
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <div className="md:flex flex-wrap gap-5 justify-center space-y-4 md:space-y-0 p-4 items-center">
          {productsData?.data?.map((product: TProduct) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
