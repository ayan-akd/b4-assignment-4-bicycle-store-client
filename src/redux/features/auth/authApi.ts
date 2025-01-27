import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/users/me?${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } =
  authApi;
