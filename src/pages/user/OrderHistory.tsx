import { Empty, Typography } from "antd";

export default function OrderHistory() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          styles={{ image: { height: 200 } }}
          description={
            <Typography.Text type="secondary">No orders found.</Typography.Text>
          }
        ></Empty>
      </div>
    </div>
  );
}
