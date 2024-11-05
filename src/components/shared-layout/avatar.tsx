"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { RiAdminLine } from "react-icons/ri";
import Portal from "#/components/ui/portal";
import { UpdateProfileForm } from "./form";


import { useProfile } from "#/services/auth-service";

export default function Avatar() {
    const { data: session } = useSession()
    const [isShowModalUpdate, setModalUpdate] = React.useState(false)

    // update session user through react query data
    const { data: profile } = useProfile()
    if (session) {
        session.user.username = profile?.data.username ?? ""
        session.user.email = profile?.data.email ?? ""
    }

    function toggleModal() {
        setModalUpdate((prev) => !prev)
    }

    return (
        <React.Fragment>
            <figure className="center flex cursor-pointer gap-2" onClick={toggleModal}>
                <div className="border center-flex rounded-full size-8 md:size-9 bg-green-400">
                    <RiAdminLine className="text-base md:text-xl"/>
                </div>
                <figcaption>
                    <div className="-space-y-1">
                        <h2 className="-tracking-wider font-medium text-sm">{session?.user?.username ?? "[Unknown]"}</h2>
                        <p className="-tracking-wider text-[12px] text-gray-500">{session?.user?.email ?? "[unknown]"}</p>
                    </div>
                </figcaption>
            </figure>
            <Portal isOpen={isShowModalUpdate}>
                <UpdateProfileForm onClose={toggleModal} />
            </Portal>
        </React.Fragment>
    )
}