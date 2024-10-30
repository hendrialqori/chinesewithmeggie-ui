"use client";

import React from "react";
import Portal from "#/components/ui/portal";
import { FiShoppingCart } from "react-icons/fi";
import { Checkout } from "./checkout";
import { useProductOfferPublic } from "#/services/product-service";
import { priceFormat } from "#/lib/utils";
import { toast } from "sonner";

export function ProductOfferCheckout() {
    const { data: offer, isLoading, isError } = useProductOfferPublic()

    const [isCheckout, setChekcout] = React.useState(false)

    function checkoutProduct() {
        if (isError) {
            toast.error("Cannot checkout, something went wrong")
            return
        }
        setChekcout(true)
    }

    function closeCheckout() {
        setChekcout(false)
    }

    return (
        <React.Fragment>
            <div id="product-offer-checkout" className="space-y-6 md:space-y-12 py-space_between_section_sm">
                <div className="text-center">
                    <h4 className="font-fredoka text-xl xl:text-[2rem] font-bold">Total value:</h4>
                    <p className="font-mulish line-through font-extrabold md:font-semibold text-xl md:text-3xl">Rp. {priceFormat(14999000)},-</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <p className="text-sm md:text-base xl:text-xl lg:text-2xl text-center !leading-[150%]">
                        Aku tuangkan pengalamanku tinggal di China selama <span className="font-bold">5 tahun</span> dan aku rangkum ke dalam guidebook ini! Kamu bisa pelajari Bahasa Mandarin secara mandiri hanya dengan seharga:
                    </p>
                </div>
                <div className="text-center">
                    <h4 className="font-fredoka text-sm md:text-2xl xl:text-[2rem] font-bold">All Guide book ini bisa kamu dapatkan dengan harga</h4>
                    <p className="font-mulish line-through font-semibold text-xl md:text-3xl">Rp. {priceFormat(offer?.data.originalPrice ?? 0)},-</p>
                </div>
                <div className="relative text-center z-[2]">
                    <p className="font-mulish font-semibold text-md md:text-base">Harga spesial hari ini!</p>
                    <h3 className="font-fredoka text-3xl md:text-6xl font-bold">Rp. {priceFormat(offer?.data.discountPrice ?? 0)},-</h3>
                </div>
                <button
                    className="relative w-max mx-auto bg-black rounded-lg center-flex gap-2 text-white px-4 md:px-6 py-3 z-[2] outline-double active:outline-black"
                    disabled={isLoading || isError}
                    onClick={checkoutProduct}
                >
                    <p className="text-md md:text-base xl:text-xl font-mulish font-medium">Dapatkan sekarang!</p>
                    <FiShoppingCart className="text-xs md:text-xl" />
                </button>
            </div>
            <Portal isOpen={isCheckout}>
                <Checkout
                    id={offer?.data.id ?? ""}
                    title={offer?.data.title ?? ""}
                    image={offer?.data.image ?? ""}
                    originalPrice={offer?.data.originalPrice ?? 0}
                    discountPrice={offer?.data.discountPrice ?? 0}
                    onClose={closeCheckout}
                />
            </Portal>
        </React.Fragment>
    )
}
