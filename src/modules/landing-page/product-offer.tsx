import Image from "next/image";
import { BsCameraVideo } from "react-icons/bs"
import { LiaAssistiveListeningSystemsSolid } from "react-icons/lia";
import { MdOutlineQuiz } from "react-icons/md";
import { ProductCardList } from "./product-card-list";
import rocket_shape from "#/assets/svg/rocket-shape.svg?url"
import orange_circle_shape from "#/assets/svg/orange-circle-shape.svg?url"
import green_circle_shape from "#/assets/svg/green-circle-shape.svg?url"
import ahalf_orange_shape from "#/assets/svg/ahafl-orange-shape.svg?url"
import { ProductOfferCheckout } from "./product-offer-checkout";

function BlurEffectBackground() {
    return (
        <div className="flex w-max absolute z-1 -translate-x-1/2 left-1/2 bottom-0">
            <div className="size-72 rounded-full bg-cwm_blue opacity-25 blur-2xl translate-x-8" />
            <div className="size-72 rounded-full bg-cwm_green opacity-25 blur-2xl -translate-x-20 -translate-y-14" />
        </div>
    )
}

function RocketShape() {
    return (
        <Image
            src={rocket_shape}
            className="size-8 md:size-14 xl:size-28 absolute -top-20 left-5 md:left-16 xl:left-0"
            width={112}
            height={112}
            alt="rocket_shape"
        />
    )
}

function OrangeCircleShape() {
    return (
        <Image
            src={orange_circle_shape}
            className="size-8 md:size-20 lg:size-28 absolute -bottom-16 md:-bottom-20 left-0 z-[1]"
            width={112}
            height={112}
            alt="orange_circle_shape"
        />
    )
}

function GreenCircleShape() {
    return (
        <Image
            src={green_circle_shape}
            className="size-[18rem] absolute bottom-1/4 -translate-y-1/2 -right-10 z-[1]"
            width={288}
            height={288}
            alt="green_circle_shape"
        />
    )
}

function AhaflOrangeShape() {
    return (
        <Image
            src={ahalf_orange_shape}
            className="size-52 absolute -bottom-10 -left-20 z-[1]"
            width={215}
            height={215}
            alt="ahalf_orange_shape"
        />
    )
}

function ProductOffer() {
    return (
        <section className="bg-[#FEF9F6] relative overflow-hidden py-20 md:py-24 mt-space_between_section_sm md:mt-space_between_section_md xl:mt-space_between_section" aria-label="product-offer">
            <div className="relative landing-page-container space-y-8 md:space-y-20">
                <RocketShape />
                <h2 className="font-fredoka font-bold text-2xl xl:text-[2rem] text-center">
                    Cuma di guidebook ini kamu bisa dapatkan:
                </h2>
                <div className="relative grid grid-cols-1 lg:grid-cols-3 place-items-start gap-6 md:gap-8 z-10" aria-label="offers">
                    <div className="center-flex flex-col space-y-3 md:space-y-6" aria-label="offer">
                        <div className="center-flex flex-col">
                            <BsCameraVideo className="text-3xl md:text-5xl text-[#F07B48]" />
                            <h3 className="font-fredoka text-xl xl:text-2xl font-bold text-[#F07B48]">Guiding Video</h3>
                        </div>
                        <p className="text-center text-sm md:text-base font-medium text-[#3A3A3A] font-mulish !leading-[150%]">
                            Nggak cuman gambar dan tulisan, di setiap bab Meggie sertakan video yang akan ngebantu kalian untuk lebih memahami cara baca, ejaan, dan nada Bahasa Mandarin.
                        </p>
                    </div>
                    <div className="center-flex flex-col space-y-3 md:space-y-6" aria-label="offer">
                        <div className="center-flex flex-col">
                            <LiaAssistiveListeningSystemsSolid className="text-3xl md:text-5xl text-cwm_blue" />
                            <h3 className="font-fredoka text-xl xl:text-2xl font-bold text-cwm_blue">Listening Pratice</h3>
                        </div>
                        <p className="text-center text-sm md:text-base font-medium text-[#3A3A3A] font-mulish !leading-[150%]">
                            Nggak cuman membaca dan menonton, Meggie juga akan kasih kamu latihan untuk mendengarkan. Kalo belajar bahasa penting banget untuk latihan mendengarkan supaya kamu makin terbiasa.
                        </p>
                    </div>
                    <div className="center-flex flex-col space-y-3 md:space-y-6" aria-label="offer">
                        <div className="center-flex flex-col">
                            <MdOutlineQuiz className="text-4xl md:text-5xl text-cwm_green" />
                            <h3 className="font-fredoka text-xl xl:text-2xl font-bold text-cwm_green">Interactive Quiz</h3>
                        </div>
                        <p className="text-center text-sm md:text-base font-medium text-[#3A3A3A] font-mulish !leading-[150%]">
                            Meggie juga akan kasih bonus quiz loh supaya kamu bisa latihan secara mandiri tentang pemahaman kamu!
                        </p>
                    </div>
                </div>
                <div className="relative z-10">
                    <BlurEffectBackground />
                    {/* checkout product offer */}
                    <ProductOfferCheckout />
                    {/* shape */}
                    <OrangeCircleShape />
                </div>
                <ProductCardList />
            </div>
            {/* shape */}
            <GreenCircleShape />
            {/* shape */}
            <AhaflOrangeShape />
        </section>
    )
}

export { ProductOffer }