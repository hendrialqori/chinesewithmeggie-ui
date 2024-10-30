"use client";

import Flow from "#/components/control-flow";
import { useProductListPublic } from "#/services/product-service";
import { ProductCard, ProductCardSkeleton } from "./product-card";

export function ProductCardList() {
    const { data: products, isPending, isSuccess } = useProductListPublic()

    return (
        <section className="relative space-y-8 md:space-y-20 pt-10 md:pt-20 z-10" aria-label="product list card">
            <h4 className="font-fredoka text-2xl xl:text-[2rem] font-bold text-center">
                Atau bisa juga pilih e-book yg lebih relevan buat kamu
            </h4>
            <Flow>
                <Flow.If condition={isPending}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </Flow.If>
                <Flow.ElseIf condition={isSuccess}>
                    <div className="flex justify-center items-start flex-wrap gap-5 xl:gap-7">
                        {products?.data?.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </Flow.ElseIf>
                <Flow.Else>
                    <p className="text-xs md:text-sm lg:text-base text-red-500 text-center">Something when wrong!</p>
                </Flow.Else>
            </Flow>
        </section>
    )
}
