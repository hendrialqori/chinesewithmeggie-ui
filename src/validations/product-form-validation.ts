import { z } from "zod"

export const productFormScheme = z.object({
    image: z.any()
        .refine((images: FileList) => images?.[0]?.name, "Required")
        .refine((images: FileList) => {
            const MAX_IMAGE_SIZE = 3_000_000 //3mb
            return images?.[0]?.size <= MAX_IMAGE_SIZE
        }, "File size too big, 3MB allowed")
        .transform((images: FileList) => images?.[0]).optional()
    ,
    name: z.string().min(1, { message: "Required" }).max(100),
    originalPrice: z.string()
        .min(1, { message: "Required" })
        .transform((price) => price.replaceAll(",", "")),
    discountPrice: z.string()
        .min(1, { message: "Required" })
        .transform((price) => price.replaceAll(",", "")),
    isOffer: z.boolean().default(false),
    zip: z.any()
        .refine((images: FileList) => images?.[0]?.name, "Required")
        .refine((images: FileList) => {
            const MAX_ZIP_SIZE = 50_000_000 //3mb
            return images?.[0]?.size <= MAX_ZIP_SIZE
        }, "File size too big, 50Mb allowed")
        .transform((zips: FileList) => zips?.[0]).optional(),
    description: z.string().min(1, { message: "Required" })
})


export type ProductFormType = z.infer<typeof productFormScheme>
