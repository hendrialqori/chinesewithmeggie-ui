import React from "react";
import Image from "next/image";
import { Product } from "#/@type";
import { cn, priceFormat } from "#/lib/utils";
import { FiShoppingCart } from "react-icons/fi";
import { STATIC } from "#/constants";
import Portal from "#/components/ui/portal";
import { Checkout } from "./checkout";

export function ProductCard(props: Product) {

    const [isCheckout, setChekcout] = React.useState(false)
    const [expand, setExpand] = React.useState(false)

    function truncateDescription(text: string) {
        const slice = text.slice(0, 50) + " ..."
        return expand ? text : slice
    }

    function toggleExpandAction() {
        setExpand(prev => !prev)
    }
    function checkoutAction(type: "open" | "close") {
        return () => setChekcout(type === "open" ? true : false)
    }

    return (
        <React.Fragment>
            <figure className="bg-white rounded-2xl overflow-hidden shadow-md z-[3] border border-gray-200 w-full md:w-[48%] xl:w-[31%]">
                <div className="bg-[#F5F5F5] flex justify-center items-center" aria-label="image-wrapper">
                    <Image
                        src={STATIC + "/" + props.image}
                        width={303}
                        height={300}
                        alt="product-pannel"
                        className="h-28 md:h-52 w-full object-cover"

                    />
                </div>
                <figcaption className="space-y-0 md:space-y-5 p-4 md:px-5 md:py-6">
                    <div className="space-y-1 md:space-y-2" aria-label="title & discription">
                        <h3 className="font-fredoka font-bold text-base lg:text-xl">{props.title}</h3>
                        <div className="min-h-14 md:min-h-20 text-[#5D5D5D] font-medium text-xs md:text-sm lg:text-base">
                            <p>{truncateDescription(props?.description ?? "")} {" "}</p>
                            <span
                                role="button"
                                tabIndex={-1}
                                className={`${expand && "text-black"} hover:underline cursor-pointer`}
                                onClick={toggleExpandAction}
                            >
                                {expand ? "[show less]" : "[read more]"}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
                        <div className="font-mulish">
                            <p className="line-through text-xs md:text-sm font-medium">Rp {priceFormat(props.originalPrice)}</p>
                            <p className="font-bold text-base xl:text-lg">Rp {priceFormat(props.discountPrice)}</p>
                        </div>
                        <button
                            className={cn(
                                "flex items-center justify-between gap-x-2 md:gap-x-3 px-2 md:px-4 py-2 md:py-[10px] text-white rounded-lg",
                                "bg-gradient-to-r from-[#6E9FB8] to-[#ADC482] outline-double hover:outline-[#6E9FB8]"
                            )}
                            onClick={checkoutAction("open")}
                        >
                            <span className="text-[0.7rem] md:text-xs xl:text-sm font-normal md:font-semibold font-mulish">Dapatkan Sekarang</span>
                            <FiShoppingCart className="text-xs md:text-xl" />
                        </button>
                    </div>
                </figcaption>
            </figure>
            <Portal isOpen={isCheckout}>
                <Checkout
                    {...props}
                    onClose={checkoutAction("close")}
                />
            </Portal>
        </React.Fragment>
    )
}


export function ProductCardSkeleton() {
    return <div className="bg-gray-300 rounded-2xl overflow-hidden shadow-md z-[3] h-52 animate-pulse" />
}
