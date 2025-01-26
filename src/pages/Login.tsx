/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomPassword from "@/components/form/CustomPassword";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NotificationToast from "@/components/ui/NotificationToast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginMutation, useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { loginSchema, registerSchema } from "@/schemas/authSchemas";
import { TResponse, TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const onLoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    NotificationToast({
      message: "Logging in...",
      type: "loading",
      toastId: "1",
    });
    try {
      const res = await login(data).unwrap() as TResponse<any>;
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      if (res.data) {
        NotificationToast({
          message: "Login successful",
          type: "success",
          toastId: "2",
          destroyId: "1",
        });
        navigate(location.state || `/${user?.role}/dashboard`);
      }
      if (res.error) {
        NotificationToast({
          message: res.error.data.message,
          type: "error",
          toastId: "2",
          destroyId: "1",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onRegisterSubmit: SubmitHandler<FieldValues> = async (data) => {
    NotificationToast({
      message: "Registering...",
      type: "loading",
      toastId: "1",
    });
    const userInfo = {
      ...data,
      role: "customer",
    };
    try {
      const res = (await register(userInfo)) as TResponse<any>;
      if (res.data) {
        NotificationToast({
          message: "Registration successful",
          type: "success",
          toastId: "2",
          destroyId: "1",
        });
      }
      if (res.error) {
        NotificationToast({
          message: res.error.data.message,
          type: "error",
          toastId: "2",
          destroyId: "1",
        });
      }
    } catch {
      NotificationToast({
        message: "Invalid credentials",
        type: "error",
        toastId: "2",
        destroyId: "1",
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <CustomForm 
            onSubmit={onLoginSubmit}
            resolver={zodResolver(loginSchema)}
            >
              <CardContent className="space-y-1">
                <div className="space-y-1">
                  <CustomInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-1">
                  <CustomPassword
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button htmlType="submit">Login</Button>
              </CardFooter>
            </CustomForm>
          </Card>
        </TabsContent>
        {/*  Register */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Register</CardTitle>
            </CardHeader>
            <CustomForm 
            onSubmit={onRegisterSubmit}
            resolver={zodResolver(registerSchema)}
            >
              <CardContent className="space-y-1">
                <div className="space-y-1">
                  <CustomInput
                    name="name"
                    type="text"
                    label="Name"
                    placeholder="Enter your name"
                  />
                  <CustomInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-1">
                  <CustomPassword
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button htmlType="submit">Register</Button>
              </CardFooter>
            </CustomForm>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
