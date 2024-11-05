import React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { IoMdClose } from "react-icons/io"
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {
   Form, FormItem, FormLabel,
   FormFielDescription, FormFieldError
} from "#/components/ui/form"
import Input from "#/components/ui/input"
import ButtonSpin from "#/components/ui/button-spin"
import { ImagePreview, ZipPreview } from "./file-preview"

import { useProduct, useProductMutation } from "#/services/product-service"
import {
   productFormScheme,
   type ProductFormType
} from "#/validations/product-form-validation"
import { cn, sanitizedNonDigits, priceFormat } from "#/lib/utils"
import { AxiosProgressEvent } from "axios"

type Props = {
   type: "CREATE" | "UPDATE"
   id?: number,
   onClose: () => void
}

const buttonLabel = {
   CREATE: "Simpan",
   UPDATE: "Simpan perubahan"
}

const initialPreview = {
   image: "",
   zip: ""
}

const initialChangeFile = {
   image: false,
   zip: false
}

export function ProductForm({ id, type, onClose, }: Props) {
   const queryClient = useQueryClient()
   const IS_UPDATE = type === "UPDATE"

   const [changeFile, setChangeFile] = React.useState(initialChangeFile)
   const [preview, setPreview] = React.useState(initialPreview)
   const [progressValue, setProgressValue] = React.useState(0)

   const { register, handleSubmit,
      formState: { errors }, setValue, reset } = useForm<ProductFormType>({
         resolver: zodResolver(productFormScheme)
      })

   const { refetch: refectProductId } = useProduct({ id: Number(id) })
   const { postMutation, updateMutation } = useProductMutation()

   const fillStateWhenUpdate = React.useCallback(async () => {
      const { data: product, isSuccess } = await refectProductId()

      if (isSuccess) {
         setPreview({
            image: product?.data.image,
            zip: product.data.zipPath
         })
         setValue("name", product?.data.title ?? "")
         setValue("originalPrice", numberFormat(product?.data.originalPrice.toString() ?? ""))
         setValue("discountPrice", numberFormat(product?.data.discountPrice.toString() ?? ""))
         setValue("isOffer", Boolean(product?.data.isOffer))
         setValue("description", product?.data.description ?? "")
      }
      // eslint-disable-next-line
   }, [refectProductId])

   React.useEffect(() => {
      if (type === "UPDATE") fillStateWhenUpdate()
   }, [type, fillStateWhenUpdate])

   function handleChangeFile(type: keyof typeof changeFile) {
      return () => setChangeFile(prev => ({ ...prev, [type]: true }))
   }

   function numberFormat(value: string) {
      const sanitized = Number(sanitizedNonDigits(value))
      const parseToNumber = priceFormat(sanitized)
      return parseToNumber
   }

   function uploadProgress(event: AxiosProgressEvent) {
      const progress = Number(event.progress?.toFixed(2))
      setProgressValue(progress)
   }

   function createNewProduct(formData: FormData) {
      postMutation.mutate({ formData, uploadProgress }, {
         onSuccess: () => {
            reset()
            onClose()
            // show toast
            toast.success(`Success create new product`, { position: "top-right" })
            // validate query
            setTimeout(() => {
               queryClient.invalidateQueries({ queryKey: ["PRODUCT/LIST"] })
            }, 500)
         },
         onError: (error) => {
            const message = error.response?.data.message
            toast.error(JSON.stringify(message))

         }
      })
   }

   function updateProduct(formData: FormData) {
      const payload = {
         id: Number(id),
         formData,
         uploadProgress
      }
      updateMutation.mutate(payload, {
         onSuccess: () => {
            reset()
            onClose()
            // show toast
            toast.success(`Success update with id ${id}`, { position: "top-right" })
            // validate query
            setTimeout(() => {
               queryClient.invalidateQueries({ queryKey: ["PRODUCT/LIST"] })
            }, 500)
         },
         onError: (error) => {
            const message = error.response?.data.message
            toast.error(JSON.stringify(message))
         }
      })
   }

   const submit = handleSubmit((state) => {

      const formData = new FormData()
      formData.append("title", state.name)
      formData.append("originalPrice", state.originalPrice)
      formData.append("discountPrice", state.discountPrice)
      formData.append("isOffer", Number(state.isOffer).toString())
      formData.append("description", state.description)
      // append image if exists
      if (state.image) {
         formData.append("image", state.image as File)
      }
      // append zip file if exist
      if (state.zip) {
         formData.append("zip", state.zip as File)
      }

      switch (type) {
         case "CREATE":
            createNewProduct(formData)
            break;
         case "UPDATE":
            updateProduct(formData)
         default:
            return
      }
   })

   const mutationPending =
      postMutation.isPending || updateMutation.isPending

   return (
      <div className="bg-white rounded-xl w-[400px] h-max px-5 py-4">
         <div className="flex justify-end items-center">
            <button onClick={onClose} disabled={mutationPending}>
               <IoMdClose className="text-xl" />
            </button>
         </div>
         <Form onSubmit={submit} className="w-full space-y-5">
            <FormItem>
               {(id) => (
                  <React.Fragment>
                     <FormLabel htmlFor={id}>Image*</FormLabel>
                     {!changeFile.image && IS_UPDATE ?
                        (<ImagePreview
                           image={preview.image}
                           onChangeImage={handleChangeFile("image")}
                        />) :
                        (<React.Fragment>
                           <Input
                              id={id}
                              type="file"
                              className="bg-[#F4F4F4]"
                              accept=".jpg, .png, .jpeg"
                              {...register("image")}
                              placeholder="Change image"
                           />
                           <FormFielDescription>
                              Max file size allowed is 3MB
                           </FormFielDescription>
                           <FormFieldError>
                              {errors.image?.message as string}
                           </FormFieldError>
                        </React.Fragment>
                        )}
                  </React.Fragment>
               )}
            </FormItem>
            <FormItem>
               {(id) => (
                  <React.Fragment>
                     <FormLabel htmlFor={id}>Name*</FormLabel>
                     <Input
                        id={id}
                        className="bg-[#F4F4F4]"
                        placeholder="Exp: Chinesewithmeggie limited edition"
                        {...register("name")}
                        aria-invalid={Boolean(errors.name?.message)}
                     />
                     <FormFieldError>
                        {errors.name?.message}
                     </FormFieldError>
                  </React.Fragment>
               )}
            </FormItem>
            <FormItem>
               {(id) => (
                  <React.Fragment>
                     <FormLabel htmlFor={id}>Original price*</FormLabel>
                     <Input
                        id={id}
                        className="bg-[#F4F4F4]"
                        placeholder="Rp."
                        {...register("originalPrice", {
                           onChange: (event) => {
                              const value = event.target.value
                              const price = numberFormat(value)
                              setValue("originalPrice", price)
                           }
                        })}
                        aria-invalid={Boolean(errors.originalPrice?.message)}
                     />
                     <FormFieldError>
                        {errors.originalPrice?.message}
                     </FormFieldError>
                  </React.Fragment>
               )}
            </FormItem>
            <FormItem>
               {(id) => (
                  <React.Fragment>
                     <FormLabel htmlFor={id}>Discounted price*</FormLabel>
                     <Input
                        id={id}
                        className="bg-[#F4F4F4]"
                        placeholder="Rp."
                        {...register("discountPrice", {
                           onChange: (event) => {
                              const value = event.target.value
                              const price = numberFormat(value)
                              setValue("discountPrice", price)
                           }
                        })}
                        aria-invalid={Boolean(errors.discountPrice?.message)}
                     />
                     <FormFieldError>
                        {errors.originalPrice?.message}
                     </FormFieldError>
                  </React.Fragment>
               )}
            </FormItem>
            <FormItem className="flex flex-col justify-start gap-1">
               {(id) => (
                  <React.Fragment>
                     <div className="center-flex justify-start">
                        <FormLabel htmlFor={id}>Is offer product</FormLabel>
                        <RiVerifiedBadgeFill className="text-green-600" />
                     </div>
                     <input
                        id={id}
                        className="bg-[#F4F4F4] size-4 rounded-lg accent-black"
                        type="checkbox"
                        {...register("isOffer")}
                        aria-invalid={Boolean(errors.isOffer?.message)}
                     />
                     <FormFielDescription>When checked will be display at product offer section</FormFielDescription>
                  </React.Fragment>
               )}
            </FormItem>
            <FormItem>
               {(id) => (
                  <React.Fragment >
                     <FormLabel htmlFor={id}>Zip file*</FormLabel>
                     {!changeFile.zip && IS_UPDATE ?
                        (<ZipPreview
                           zip={preview.zip}
                           onChangeZip={handleChangeFile("zip")}
                        />) :
                        (<React.Fragment>
                           <Input
                              id={id}
                              type="file"
                              className="bg-[#F4F4F4]"
                              accept=".zip"
                              {...register("zip")}
                           />
                           <FormFieldError>
                              {errors.zip?.message as string}
                           </FormFieldError>
                        </React.Fragment>
                        )}
                  </React.Fragment>
               )}
            </FormItem>
            <FormItem className="flex flex-col">
               {(id) => (
                  <React.Fragment>
                     <FormLabel htmlFor={id}>Description*</FormLabel>
                     <textarea
                        id={id}
                        placeholder="Description"
                        {...register("description")}
                        className={cn(
                           "block w-full rounded-lg font-medium text-xs md:text-sm h-20 px-3 py-3 md:py-2",
                           "bg-[#F4F4F4] outline-2 focus:outline focus:outline-black ",
                           "placeholder:text-gray-500 placeholder:text-[0.8rem] md:placeholder:text-sm",
                        )}
                        aria-invalid={Boolean(errors.description?.message)}
                     />
                     <FormFieldError>
                        {errors.description?.message}
                     </FormFieldError>
                  </React.Fragment>
               )}
            </FormItem>
            <div className="py-3 flex justify-end">
               <button
                  className={cn(
                     "w-1/2 text-xs md:text-sm font-medium bg-black select-none",
                     "text-white rounded-lg py-2 h-10 outline-double active:outline-black",
                     "disabled:bg-black/70"
                  )}
                  disabled={mutationPending}
               >
                  {mutationPending ?
                     <Progress progressValue={progressValue} />
                     : buttonLabel[type]}
               </button>
            </div>
         </Form>
      </div >
   )
}

function Progress({ progressValue }: { progressValue: number }) {
   const percentage = ((progressValue / 1.00) * 100).toFixed() + "%"
   return (
      <div className="center-flex gap-2">
         <ButtonSpin />
         <p className="text-xs font-normal">upload {percentage}</p>
      </div>
   )
}