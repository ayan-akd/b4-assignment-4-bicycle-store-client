import CustomForm from "@/components/form/CustomForm";
import CustomPassword from "@/components/form/CustomPassword";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NotificationToast from "@/components/ui/NotificationToast";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { changePasswordSchema } from "@/schemas/authSchemas";
import { TResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    NotificationToast({
      message: "Changing password...",
      type: "loading",
      toastId: "loading",
    });
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await changePassword(data)) as TResponse<any>;
      if (res.data) {
        NotificationToast({
          message: "Password changed successfully",
          type: "success",
          toastId: "2",
          destroyId: "1",
        });
        dispatch(logOut());
        navigate("/login");
      }
    } catch (err) {
      NotificationToast({
        message: "Something went wrong",
        type: "error",
        toastId: "2",
        destroyId: "1",
      });
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Change Password</CardTitle>
        </CardHeader>
        <CustomForm
          onSubmit={onSubmit}
          resolver={zodResolver(changePasswordSchema)}
        >
          <CardContent className="space-y-2">
            <CustomPassword name="oldPassword" label="Old Password" />
            <CustomPassword name="newPassword" label="New Password" />
          </CardContent>
          <CardFooter>
            <Button htmlType="submit" className="mx-auto">
              Submit
            </Button>
          </CardFooter>
        </CustomForm>
      </Card>
    </div>
  );
}
