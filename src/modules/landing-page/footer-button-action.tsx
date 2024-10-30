"use client";

import { FiShoppingCart } from "react-icons/fi";
import { scrollInto } from "#/lib/utils";

export function ScrollIntoProduct() {
    const scrollIntoProductOffer =
        () => scrollInto("#product-offer-checkout")

    return (
        <div className="w-full md:w-6/12 xl:w-4/12 space-y-5 flex items-center md:items-start flex-col" aria-label="left-side">
            <h2 className="font-fredoka font-bold text-xl lg:text-3xl leading-[150%] text-center md:text-left">BEST DEAL Beli sekarang ​dan dapatkan GRATIS ​update konten selamanya !</h2>
            <button
                className="relative w-max bg-black rounded-lg center-flex gap-2 text-white px-4 md:px-6 py-3 z-[2] outline-double active:outline-black"
                onClick={scrollIntoProductOffer}
            >
                <p className="text-xs md:text-base xl:text-xl font-mulish font-medium">Dapatkan sekarang</p>
                <FiShoppingCart className="text-xs md:text-xl" />
            </button>
        </div>
    )
}