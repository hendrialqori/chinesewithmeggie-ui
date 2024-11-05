import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { IoMdClose } from "react-icons/io"
import { toast } from "sonner"

import {
    Form, FormItem, FormLabel,
    FormFielDescription, FormFieldError
} from "#/components/ui/form"
import Input from "#/components/ui/input"
import ButtonSpin from "#/components/ui/button-spin"

import { useUpdateProfile } from "#/services/auth-service"
import { ProfileFormType, profileFormScheme } from "#/validations/profile-form-validation"
import { cn } from "#/lib/utils"


type Props = {
    onClose: () => void
}

export function UpdateProfileForm({ onClose }: Props) {
    const queryClient = useQueryClient()
    const { data: session } = useSession()

    const { register, handleSubmit,
        formState: { errors }, setError } = useForm<ProfileFormType>({
            resolver: zodResolver(profileFormScheme),
            defaultValues: {
                email: session?.user?.email,
                username: session?.user?.username
            }
        })

    const update = useUpdateProfile()

    function updateProfile(params: ProfileFormType) {
        const payload = {
            username: params.username!,
            email: params.email!,
            password: params.password!
        }

        update.mutate(payload, {
            onSuccess: (res) => {
                const message = res.message ?? "Success update profile"
                toast.success(message, { position: "top-center" })

                if (session) {
                    session.user.username = res.data.username
                    session.user.email = res.data.email
                }

                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["PROFILE"] })
                }, 500)

                onClose()
            },
            onError: (error) => {
                const message = error.response?.data.message ?? "Update profile failed"
                toast.error(message, { position: "top-center" })
            }
        })
    }

    const submit = handleSubmit((state) => {
        if (state.password && state.password !== state.confirmPassword) {
            setError("confirmPassword", {
                message: "Password not match!"
            })
            return
        }

        updateProfile(state)
    })

    return (
        <div className="bg-white rounded-xl w-[400px] h-max px-5 py-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="font-medium text-sm md:text-base">Update profile</h1>
                <button onClick={onClose} disabled={update.isPending}>
                    <IoMdClose className="text-xl" />
                </button>
            </div>
            <Form onSubmit={submit} className="w-full space-y-5">
                <FormItem>
                    {(id) => (
                        <React.Fragment>
                            <FormLabel htmlFor={id}>Email*</FormLabel>
                            <Input
                                id={id}
                                className="bg-[#F4F4F4] disabled:text-gray-500"
                                placeholder="Exp: Chinesewithmeggie limited edition"
                                {...register("email")}
                                aria-invalid={Boolean(errors.email?.message)}
                            />
                            <FormFieldError>
                                {errors.email?.message}
                            </FormFieldError>
                        </React.Fragment>
                    )}
                </FormItem>
                <FormItem>
                    {(id) => (
                        <React.Fragment>
                            <FormLabel htmlFor={id}>Username*</FormLabel>
                            <Input
                                id={id}
                                className="bg-[#F4F4F4]"
                                placeholder="Exp: Chinesewithmeggie limited edition"
                                {...register("username")}
                                aria-invalid={Boolean(errors.username?.message)}
                            />
                            <FormFieldError>
                                {errors.username?.message}
                            </FormFieldError>
                        </React.Fragment>
                    )}
                </FormItem>
                <FormItem>
                    {(id) => (
                        <React.Fragment>
                            <FormLabel htmlFor={id}>New password</FormLabel>
                            <Input
                                id={id}
                                className="bg-[#F4F4F4]"
                                placeholder="*********"
                                {...register("password")}
                                aria-invalid={Boolean(errors.password?.message)}
                                type="password"
                            />
                            <FormFielDescription>
                                Password is optional
                            </FormFielDescription>
                            <FormFieldError>
                                {errors.password?.message}
                            </FormFieldError>
                        </React.Fragment>
                    )}
                </FormItem>
                <FormItem>
                    {(id) => (
                        <React.Fragment>
                            <FormLabel htmlFor={id}>Confirm new password</FormLabel>
                            <Input
                                id={id}
                                className="bg-[#F4F4F4]"
                                placeholder="*********"
                                {...register("confirmPassword")}
                                aria-invalid={Boolean(errors.confirmPassword?.message)}
                                type="password"
                            />
                            <FormFielDescription>
                                Retype your new password to avoid mistakes
                            </FormFielDescription>
                            <FormFieldError>
                                {errors.confirmPassword?.message}
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
                        disabled={update.isPending}
                    >
                        {update.isPending ? <ButtonSpin /> : "Simpan perubahan"}
                    </button>
                </div>
            </Form>
        </div >
    )
}