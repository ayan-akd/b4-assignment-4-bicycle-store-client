import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TProduct, TQueryParams } from "@/types";
import { useState } from "react";
import ProductCard from "../admin/ProductCard";
import { Empty, Pagination, Select, Spin, Typography } from "antd";
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
  const { data: productsData, isFetching } = useGetAllProductsQuery([
    ...params,
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
          onSearch={(value) => {
            setParams([{ name: "searchTerm", value }]);
          }}
          onChange={(e) => {
            setParams([{ name: "searchTerm", value: e.target.value }]);
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
              setParams([{ name: "sort", value }, { name: "page", value: "1" }]);
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
      ) : productsData?.data.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            styles={{ image: { height: 200 } }}
            description={
              <Typography.Text type="secondary">
                No Products found.
              </Typography.Text>
            }
          ></Empty>
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
              onChange={(newPage) =>
                setParams([{ name: "page", value: newPage }])
              }
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
}
