/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParams, TResponseRedux } from "../../../types/global.type";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: ["products"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      providesTags: ["brands"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products", "product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useGetBrandsQuery,
} = productManagementApi;
