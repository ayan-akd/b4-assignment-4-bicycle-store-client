/* eslint-disable @typescript-eslint/no-unused-expressions */
import { notification, Spin } from "antd";

interface NotificationToastProps {
  destroyId?: string;
  toastId: string;
  type: "success" | "error" | "loading";
  message: string;
  description?: string;
}

const NotificationToast = ({
  destroyId,
  toastId,
  type,
  message,
  description,
}: NotificationToastProps): void => {
  if (destroyId) {
    notification.destroy(destroyId);
    setTimeout(
      () => triggerNotification(toastId, type, message, description),
      200
    );
  } else {
    triggerNotification(toastId, type, message, description);
  }
};

const triggerNotification = (
  toastId: string,
  type: "success" | "error" | "loading",
  message: string,
  description?: string
): void => {
  const commonProps = {
    key: toastId,
    message,
    description,
    showProgress: true,
    pauseOnHover: true,
  };

  switch (type) {
    case "success":
      notification.success(commonProps);
      break;
    case "error":
      notification.error(commonProps);
      break;
    case "loading":
      notification.info({ ...commonProps, icon: <Spin /> });
      break;
    default:
      notification.info(commonProps);
  }
};

export default NotificationToast;
