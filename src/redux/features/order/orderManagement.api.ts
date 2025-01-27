/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllProducts: builder.query({
    //   query: (args: TQueryParams[] | undefined) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item: TQueryParams) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: "/products",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["products"],
    //   transformResponse: (response: TResponseRedux<any>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders", "products", "product"],
    }),
    
  }),
});

export const {
  useCreateOrderMutation,
} = orderManagementApi;
