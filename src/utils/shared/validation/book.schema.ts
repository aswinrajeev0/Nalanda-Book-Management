import { z } from "zod";

export const BaseBookSchema = z.object({
    title: z.string()
        .trim()
        .min(1, "Title is required"),

    ISBN: z.number()
        .int("ISBN must be an integer")
        .positive("ISBN must be a positive number"),
    // .min(13)
    // .max(13),

    author: z.string()
        .trim()
        .min(1, "Author name is required"),

    publicationDate: z.string()
        .refine(val => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        })
        .transform(val => new Date(val)),

    genre: z.string()
        .trim()
        .min(1, "Genre is required"),

    stock: z.number()
        .int("Stock must be an integer")
        .positive("Stock must be a positive number")
        .min(0)
})

export const AddBookSchema = BaseBookSchema
export type AddBookDto = z.infer<typeof AddBookSchema>

export const UpdateBookSchema = BaseBookSchema.partial();
export type UpdateBookDto = z.infer<typeof UpdateBookSchema>