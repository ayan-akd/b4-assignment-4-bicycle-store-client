import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TProduct } from "@/types";
import ProductCard from "../admin/ProductCard";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";

export default function Featured() {
  const { data: productsData, isFetching } = useGetAllProductsQuery(undefined);
  const featuredProducts = productsData?.data?.slice(0, 4);
  return (
    <div>
      <h1 className="text-center text-4xl mt-10 mb-10 font-bold">
        Featured Bicycles
      </h1>
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <div className="md:flex flex-wrap gap-5 justify-center space-y-4 md:space-y-0 p-4 items-center">
          {featuredProducts?.map((product: TProduct) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
      <Link to={"all-products"} className="flex justify-center mt-10">
      <Button type="primary">View All</Button>
      </Link>
    </div>
  );
}
