import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TProduct, TQueryParams } from "@/types";
import { useState } from "react";
import ProductCard from "../admin/ProductCard";
import { Pagination, Select, Spin } from "antd";
import Search from "antd/es/input/Search";
import { categoryOptions } from "@/constants/productConstants";

const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "-name", label: "Name (Z-A)" },
  { value: "-price", label: "Price (High-Low)" },
  { value: "price", label: "Price (Low-High)" },
  { value: "-createdAt", label: "Latest" },
];
export default function AllProducts() {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const { data: productsData, isFetching } = useGetAllProductsQuery([
    ...params,
    { name: "page", value: page },
    { name: "limit", value: "8" },
  ]);

  return (
    <div>
      <h1 className="text-center text-4xl mt-20 mb-10 font-bold">
        All Products
      </h1>
      <div className="flex flex-col md:flex-row  justify-around items-center gap-5 mb-10 px-10 ">
        <Select
          size="large"
          placeholder="Select Category..."
          className="w-full md:w-[200px]"
          options={categoryOptions}
          allowClear
          loading={isFetching}
          onChange={(value) => {
            if (value) {
              setParams([{ name: "category", value }]);
            } else {
              setParams([]);
            }
          }}
        />
        <Search
          className="w-full md:w-[450px] order-first md:order-none"
          placeholder="Search products..."
          enterButton="Search"
          allowClear
          size="large"
          loading={isFetching}
          onChange={(e) => {
            setParams([{ name: "searchTerm", value: e.target.value }]);
            setPage(1);
          }}
        />
        <Select
          size="large"
          placeholder="Sort By..."
          className="w-full md:w-[200px]"
          options={sortOptions}
          allowClear
          loading={isFetching}
          onChange={(value) => {
            if (value) {
              setParams([{ name: "sort", value }]);
              setPage(1);
            } else {
              setParams([]);
            }
          }}
        />
      </div>
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
        <div className="md:flex flex-wrap gap-5 justify-center space-y-4 md:space-y-0 p-4 items-center">
          {productsData?.data?.map((product: TProduct) => (
            <ProductCard key={product?._id} product={product} />
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
