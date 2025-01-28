/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, Card, Image, Tag, Typography } from "antd";
import { TProduct, TResponse } from "@/types";
import { useNavigate } from "react-router-dom";
import ConfirmToast from "@/components/ui/ConfirmToast";
import { useDeleteProductMutation } from "@/redux/features/admin/productManagement.api";
import NotificationToast from "@/components/ui/NotificationToast";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { motion } from "framer-motion";
import { MdCompareArrows } from "react-icons/md";

const { Title } = Typography;

type ProductCardProps = {
  product: TProduct;
  management?: boolean;
  compareItems?: TProduct[];
  setCompareItems?: React.Dispatch<React.SetStateAction<TProduct[]>>;
};

const ProductCard = ({
  product,
  management,
  compareItems,
  setCompareItems,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();
  const user = useAppSelector(useCurrentUser);
  const { name, price, image, description, _id, category, brand, quantity } =
    product;

  const handleDelete = async (id: string) => {
    try {
      const res = (await deleteProduct(id)) as TResponse<any>;
      if (res.data) {
        NotificationToast({
          message: "Product deleted successfully",
          type: "success",
          toastId: "2",
        });
      } else if (res.error) {
        NotificationToast({
          message: res.error.data.message,
          type: "error",
          toastId: "2",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCompare = (product: TProduct) => {
    if (compareItems && compareItems.length < 3) {
      setCompareItems?.([...compareItems, product]);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className=" rounded-2xl shadow-xl"
    >
      <Badge.Ribbon text={`$${price}`} color="blue">
        <Card
          hoverable
          className="w-full sm:w-[300px] overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          cover={
            <Image
              alt={name}
              src={image}
              className="w-full h-full object-cover"
            />
          }
        >
          <Title title={name} className="line-clamp-1" level={4}>
            {name}
          </Title>
          <div className="flex justify-around items-center mb-2">
          <Tag color="green" className="">
            {category}
          </Tag>
          <Tag color="blue" className="">
            {brand.toLocaleUpperCase()}
          </Tag>
          <Tag color={quantity > 0 ? "success" : "error"}>
            {quantity > 0 ? "In Stock" : "Out of Stock"}
          </Tag>
          </div>
          <p
            title={description}
            className="text-gray-600 text-sm line-clamp-2 mb-4"
          >
            {description}
          </p>
          <div className="flex gap-2 mt-4">
            <Button type="primary" onClick={() => navigate(`/product/${_id}`)}>
              View Details
            </Button>

            {!management && (
              <Button
                icon={<MdCompareArrows />}
                onClick={() => handleAddToCompare(product)}
              >
                Compare
              </Button>
            )}

            {user?.role === "admin" && management && (
              <ConfirmToast
                buttonText="Delete"
                onConfirm={() => handleDelete(_id)}
                title="Delete Product"
                description="Are you sure you want to delete this product?"
                danger={true}
              />
            )}
          </div>
        </Card>
      </Badge.Ribbon>
    </motion.div>
  );
};

export default ProductCard;
