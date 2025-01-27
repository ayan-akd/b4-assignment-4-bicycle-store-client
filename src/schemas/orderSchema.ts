import { z } from "zod";

export const orderSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  quantity: z
    .number({
      required_error: "Valid Quantity is required",
      invalid_type_error: "Quantity must be a positive integer",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be a positive integer"),
  price: z
    .number({
      required_error: "Total Price is required",
      invalid_type_error: "Total Price must be a positive number",
    })
    .positive("Total Price must be a positive number"),
    email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }), 
  address: z.string({
    required_error: "Address is required",
    invalid_type_error: "Address must be a string",
  })
});
