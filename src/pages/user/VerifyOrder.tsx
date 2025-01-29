import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, Empty, QRCode, Spin, Tag, Typography } from "antd";
import { useVerifyOrderQuery } from "@/redux/features/order/orderManagement.api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function VerifyOrder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, isFetching } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
      skip: !searchParams.get("order_id"),
    }
  );
  if (!searchParams.get("order_id")) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          styles={{ image: { height: 200 } }}
          description={
            <Typography.Text type="secondary" className="text-lg">
              Invalid Order Id
            </Typography.Text>
          }
        />
      </div>
    );
  }
  const orderData: OrderData = data?.data?.[0];

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6 px-5">
        <h1 className="text-3xl font-bold">Order Verification</h1>
        {(orderData?.bank_status === "Failed" ||
          orderData?.bank_status === "Cancel") && (
          <Button onClick={() => navigate(-1)} type="primary">
            Try again?
          </Button>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Order ID:</dt>
              <dd>{orderData?.order_id}</dd>
              <dt className="font-semibold">Amount:</dt>
              <dd>
                {orderData?.currency} {orderData?.amount.toFixed(2)}
              </dd>
              <dt className="font-semibold">Status:</dt>
              <dd>
                <Tag
                  color={
                    orderData?.bank_status === "Success"
                      ? "success"
                      : orderData?.bank_status === "Failed"
                      ? "error"
                      : orderData?.bank_status === "Cancel"
                      ? "warning"
                      : "default"
                  }
                >
                  {orderData?.bank_status === "Cancel"
                    ? "Canceled"
                    : orderData?.bank_status}
                </Tag>
              </dd>
              <dt className="font-semibold">Date:</dt>
              <dd>{new Date(orderData?.date_time).toLocaleString()}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Method:</dt>
              <dd>{orderData?.method}</dd>
              <dt className="font-semibold">Transaction ID:</dt>
              <dd>{orderData?.bank_trx_id}</dd>
              <dt className="font-semibold">Invoice No:</dt>
              <dd>{orderData?.invoice_no}</dd>
              <dt className="font-semibold">SP Code:</dt>
              <dd>{orderData?.sp_code}</dd>
              <dt className="font-semibold">SP Message:</dt>
              <dd>{orderData?.sp_message}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Name:</dt>
              <dd>{orderData?.name}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd>{orderData?.email}</dd>
              <dt className="font-semibold">Phone:</dt>
              <dd>{orderData?.phone_no}</dd>
              <dt className="font-semibold">Address:</dt>
              <dd>{orderData?.address}</dd>
              <dt className="font-semibold">City:</dt>
              <dd>{orderData?.city}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order QR Code</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <QRCode value={window.location.href} size={200} />
            <Link to={"/customer/order-history"}>
              <Button type="primary">View Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
