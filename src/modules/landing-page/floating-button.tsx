"use client"

import { scrollInto } from "#/lib/utils";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdOutlineArrowForward } from "react-icons/md";

export function WhatsApp() {
    return (
        <a href="https://api.whatsapp.com/send?phone=628981548300" target="_self" className="fixed bottom-20 right-5 z-20">
            <div className="size-10 md:size-12 rounded-full center-flex bg-[#25D366]">
                <IoLogoWhatsapp className="text-white text-2xl md:text-3xl" />
            </div>
        </a>
    )
}

export function BuyNow() {
    const scrollIntoProducts =
        () => scrollInto("#producs")
    return (
        <button className="fixed bottom-5 right-5 z-10" onClick={scrollIntoProducts}>
            <div className="rounded-full center-flex bg-black text-white px-5 py-2 gap-2">
                <p className="text-sm md:text-lg font-medium">Dapatkan sekarang</p>
                <MdOutlineArrowForward className="text-white text-base md:text-xl" />
            </div>
        </button>
    )
}