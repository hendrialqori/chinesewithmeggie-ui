"use client"

import Image from "next/image";
import { Form, FormLabel, FormItem, FormFielDescription, FormFieldError } from "#/components/ui/form";
import Input from "#/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormScheme, type CheckoutFormType } from "#/validations/checkout-form-validation";
import React from "react";
import { priceFormat } from "#/lib/utils";
import { Product } from "#/@type";
import { STATIC } from "#/constants";
import { useCreateInvoice } from "#/services/transaction-service";
import { toast } from "sonner";
import Portal from "#/components/ui/portal";
import { CgSpinner } from "react-icons/cg";

type Props = Omit<Product, "isOffer" | "zipPath" | "description"> & {
    onClose: () => void
}

type CreateInvoice = Omit<CheckoutFormType, "confirmEmail"> & {
    productId: string,
}

export function Checkout(props: Props) {
    const { register, handleSubmit,
        formState: { errors }, getValues, setError } = useForm<CheckoutFormType>({
            resolver: zodResolver(checkoutFormScheme)
        })

    const invoice = useCreateInvoice()

    function emailMatchingChecker() {
        const email = getValues("email")
        const confirmEmail = getValues("confirmEmail")
        return email === confirmEmail
    }

    const submit = handleSubmit((state) => {
        const isMatch = emailMatchingChecker()
        if (!isMatch) {
            setError("confirmEmail", { message: "Email do not match" })
            return
        }

        // data create invoice
        const data: CreateInvoice = {
            productId: props.id.toString(),
            email: state.email,
            name: state.name,
            phone: state.phone
        }

        invoice.mutate(data, {
            onSuccess: (props) => {
                const { invoiceUrl } = props.data
                window.open(invoiceUrl, "_blank")
            },
            onError: (error) => {
                const message = String(error.response?.data.errors)
                toast.error(message)
            }
        })
    })

    return (
        <React.Fragment>
            <div className="w-[768px] h-max grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden bg-white">
                <div className="bg-gray-200">
                    <div className="h-[180px] md:h-[220px]">
                        <Image
                            src={STATIC + "/" + props.image}
                            width={500}
                            height={500}
                            alt="product-avatar"
                            className="size-full object-cover object-center"
                        />
                    </div>
                    <div className="flex flex-col justify-center py-2">
                        <h2 className="text-sm md:text-base font-fredoka font-bold text-center">{props.title}</h2>
                        <div className="font-mulish center-flex flex-col gap-1 py-2">
                            <p className="line-through text-xs md:text-sm font-medium">Rp {priceFormat(props.originalPrice)}</p>
                            <p className="font-extrabold text-sm md:text-base">Rp {priceFormat(props.discountPrice)}</p>
                        </div>
                    </div>
                </div>
                <div className="px-5 py-6 center-flex">
                    <Form onSubmit={submit} className="w-full space-y-3">
                        <FormItem className="space-y-2">
                            {(id) => (
                                <React.Fragment>
                                    <FormLabel htmlFor={id}>Name</FormLabel>
                                    <Input
                                        id={id}
                                        {...register("name")}
                                        placeholder="Name"
                                        aria-invalid={Boolean(errors.name?.message)}
                                        className="bg-gray-100"
                                    />
                                    <FormFielDescription>
                                        Enter your first/last name
                                    </FormFielDescription>
                                    <FormFieldError>
                                        {errors.name?.message as string}
                                    </FormFieldError>
                                </React.Fragment>
                            )}
                        </FormItem>
                        <FormItem className="space-y-2">
                            {(id) => (
                                <React.Fragment>
                                    <FormLabel htmlFor={id}>Phone</FormLabel>
                                    <Input
                                        id={id}
                                        {...register("phone", { valueAsNumber: true })}
                                        type="number"
                                        placeholder="Example: 089677557221"
                                        aria-invalid={Boolean(errors.phone?.message)}
                                        className="bg-gray-100"
                                    />
                                    <FormFielDescription>
                                        Enter your phone number
                                    </FormFielDescription>
                                    <FormFieldError>
                                        {errors.phone?.message as string}
                                    </FormFieldError>
                                </React.Fragment>
                            )}
                        </FormItem>
                        <FormItem className="space-y-2">
                            {(id) => (
                                <React.Fragment>
                                    <FormLabel htmlFor={id}>Email</FormLabel>
                                    <Input
                                        id={id}
                                        {...register("email")}
                                        placeholder="Email"
                                        aria-invalid={Boolean(errors.email?.message)}
                                        className="bg-gray-100"
                                    />
                                    <FormFielDescription>
                                        Enter your email
                                    </FormFielDescription>
                                    <FormFieldError>
                                        {errors.email?.message as string}
                                    </FormFieldError>
                                </React.Fragment>
                            )}
                        </FormItem>
                        <FormItem className="space-y-2">
                            {(id) => (
                                <React.Fragment>
                                    <FormLabel htmlFor={id}>Confirm Email</FormLabel>
                                    <Input
                                        id={id}
                                        {...register("confirmEmail")}
                                        placeholder="Confirm email"
                                        aria-invalid={Boolean(errors.confirmEmail?.message)}
                                        className="bg-gray-100"
                                    />
                                    <FormFielDescription>
                                        Retype your email to avoid mistakes
                                    </FormFielDescription>
                                    <FormFieldError>
                                        {errors.confirmEmail?.message as string}
                                    </FormFieldError>
                                </React.Fragment>
                            )}
                        </FormItem>
                        <div className="pt-6 center-flex gap-3">
                            <button
                                className="w-1/2 text-xs md:text-sm font-medium bg-[#F8F8F8] border border-[#DBDBDB] rounded-lg py-2 h-10 hover:outline-double hover:outline-black"
                                onClick={props.onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-1/2 text-xs md:text-sm font-medium bg-black text-white rounded-lg py-2 h-10 outline-double active:outline-black"
                                disabled={invoice.isPending}
                            >
                                Continue payment
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
            <Portal isOpen={invoice.isPending}>
                <div className="text-white center-flex gap-2">
                    <p>Continue payment...</p>
                    <CgSpinner className="animate-spin text-xl" />
                </div>
            </Portal>
        </React.Fragment>
    )
}
