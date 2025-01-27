export type TRole = "admin" | "customer";

import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  page: number;
  limit: number;
  totalDocuments: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};

export type TUser = {
    userId: string;
    role: string;
    email: string;
    iat: number;
    exp: number;
  };

  export type TUserData = {
    name: string;
    id: string;
    role: TRole;
    email: string;
    _id: string;
    status: string;
    createdAt: string;
  };
  
  