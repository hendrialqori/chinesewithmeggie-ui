import Image from "next/image";
import star_shape from "#/assets/svg/star-shape.svg?url"
import dollar_shape from "#/assets/svg/dollar-shape.svg?url"
import { LuCheck } from "react-icons/lu";
import { productKnowledgePoints } from "#/constants";


function Point({ description }: { description: string }) {
    return (
        <div className="flex justify-start items-start gap-4">
            <div className="bg-cwm_green rounded-[0.25rem] p-[2px]">
                <LuCheck className="text-white text-xs md:text-lg" />
            </div>
            <p className="text-sm md:text-base xl:text-lg md:-translate-y-1 font-medium">{description}</p>
        </div>
    )
}

function StarShape() {
    return (
        <Image
            src={star_shape}
            className="size-8 md:size-14 xl:size-28 absolute top-5 md:-top-20 right-10 md:right-1/4"
            width={112}
            height={112}
            alt="star-shape"
        />
    )
}

function DollarShape() {
    return (
        <Image
            src={dollar_shape}
            className="size-8 md:size-16 xl:size-28 absolute -bottom-3 md:-bottom-10 right-20 md:right-40"
            width={112}
            height={112}
            alt="dollar-shape"
        />
    )
}

export function ProductKnowledge() {
    return (
        <section className="landing-page-container relative flex flex-col lg:flex-row gap-8 py-12 md:py-24 t-space_between_section_sm md:mt-space_between_section_md xl:mt-space_between_section">
            <StarShape />
            <div className="w-full lg:w-5/12 space-y-8 md:space-y-12" aria-label="product knowledge description">
                <h2 className="font-fredoka text-center font-bold text-2xl xl:text-[2rem] text-[#6E9FB8]">Apa yang kamu dapatkan ?</h2>
                <div className="space-y-5 md:space-y-7">
                    {productKnowledgePoints.map((point, i) => (
                        <Point
                            key={i}
                            description={point}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-7/12" aria-label="image">
                <div className="center-flex flex-col sticky top-1/4">
                    <Image
                        src="/image/cover-ebook.png"
                        width={674}
                        height={440}
                        alt="cover-ebook"

                    />
                    <div className="flex gap-3">
                        <div className="h-1 w-7 md:w-14 bg-cwm_orange" />
                        <div className="h-1 w-7 md:w-14 bg-cwm_blue" />
                        <div className="h-1 w-7 md:w-14 bg-cwm_green" />
                    </div>
                </div>
            </div>
            <DollarShape />
        </section>
    )
}
