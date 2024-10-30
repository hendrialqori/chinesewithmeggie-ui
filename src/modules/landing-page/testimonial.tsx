import React from "react";
import Image from "next/image"
import pink_circle_shape from "#/assets/svg/pink-circle-shape.svg?url"
import { testimonial } from "#/constants";

function Testimony({ image }: { image: string }) {
    return (
        <div className="relative z-10 rounded-[1.25rem] overflow-hidden w-[47%] md:w-[30%] xl:w-[24%]">
            <Image
                src={image}
                width={210}
                height={277}
                className="size-full"
                alt="testimony"
            />
        </div>
    )
}

function GreenShape() {
    return (
        <Image
            src="/image/green-shape.png"
            className="size-8 md:size-20 lg:size-28 absolute -top-3 md:top-0 left-5 xl:-left-20"
            width={112}
            height={112}
            alt="green-shape"
        />
    )
}

function BlueShape() {
    return (
        <Image
            src="/image/blue-shape.png"
            className="size-10 md:size-20 lg:size-28 absolute -top-5 md:-top-20 right-5 xl:-right-20"
            width={112}
            height={112}
            alt="blue-shape"
        />
    )
}

function PinkCircleShape() {
    return (
        <Image
            src={pink_circle_shape}
            className="size-8 md:size-14 lg:size-28 absolute -top-4 md:-top-20 left- xl:-left-20"
            width={112}
            height={112}
            alt="pink-circle-shape"
        />
    )
}

function Testimonial() {
    return (
        <section
            className="mt-space_between_section_sm md:mt-space_between_section_md xl:mt-space_between_section"
            aria-label="testimonial">
            <div className="landing-page-container2nd relative">
                <GreenShape />
                <BlueShape />
            </div>
            <div className="landing-page-container2nd space-y-8 md:space-y-20 py-7 md:py-14 relative">
                <h2 className="font-fredoka font-bold text-2xl xl:text-[2rem] text-center">Apa kata Mereka?</h2>
                <div className="flex justify-center flex-wrap gap-3">
                    {testimonial.map((testimony, i) => (
                        <Testimony
                            key={i}
                            image={testimony.image}
                        />
                    ))}
                </div>
            </div>
            <div className="landing-page-container2nd relative">
                <PinkCircleShape />
            </div>
        </section>
    )
}

export { Testimonial }