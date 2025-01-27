/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParams, TResponseRedux } from "../../../types/global.type";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users",
          method: "GET",
          params,
        };
      },
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users", "user"],
    }),
  }),
});

export const {
 useGetAllUsersQuery,
 useUpdateUserMutation,
} = userManagementApi;
