import Image from "next/image";
import china_flag from "#/assets/svg/china-flag.svg?url"
import * as Utils from "#/lib/utils"
import * as Button from "./hero-button-action";

function Header() {
    return (
        <div className="landing-page-container pt-8 pb-12 md:py-10 center-flex md:justify-start" aria-label="navbar">
            <section className="flex items-center">
                <p className="font-fredoka font-semibold text-xs md:text-base xl:text-xl">Chinesewithmeggie</p>
                <Image
                    src={china_flag} width={20} height={14} alt="china_flag"
                />
            </section>
        </div>
    )
}

function BlurEffectBackground() {
    return (
        <div className="absolute z-1 grid grid-cols-2 w-max le">
            <div className="size-72 rounded-full bg-cwm_orange opacity-15 blur-2xl" />
            <div className="size-72 rounded-full bg-cwm_green opacity-15 blur-2xl -translate-x-28" />
            <div className="size-72 rounded-full bg-cwm_blue opacity-15 blur-2xl -translate-y-28" />
            <div className="size-72 rounded-full bg-cwm_yellow opacity-15 blur-2xl -translate-x-28 -translate-y-28" />
        </div>
    )
}

function Column(props: { children: React.ReactNode, className?: string }) {
    const className = Utils.merge(
        "space-y-2 md:space-y-3",
        props.className
    )

    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export function Hero() {
    return (
        <section className="bg-[#FEF9F6] pb-20 md:pb-28 relative overflow-hidden">
            <Header />
            <div className="relative landing-page-container">
                <BlurEffectBackground />
            </div>
            <div className="landing-page-container grid grid-cols-1 xl:grid-cols-2 gap-16 md:gap-28 xl:gap-14">
                <div className="space-y-10 mt-0 xl:mt-20 z-[2] mx-auto xl:mx-[0]" aria-label="left-side">
                    <div className="relative space-y-6 z-[2]" aria-label="tagline & descriptions">
                        <div className="space-y-1">
                            <h1 className="font-fredoka font-bold text-center md:text-left text-3xl md:text-4xl lg:text-5xl !leading-[120%]">
                                #1 Guide Book
                                <span className="relative text-[#F1936B] px-1 md:px-3">
                                    Mandarin</span> untuk kehidupan sehari-hari & traveling
                            </h1>
                        </div>
                        <p className="font-mulish font-medium text-xs md:text-base max-w-lg text-center md:text-left">
                            Akses materi belajar yang komprehensif untuk menguasai bahasa Mandarin dan memahami budaya China.
                        </p>
                    </div>
                    <div className="relative center-flex flex-col md:flex-row justify-center md:justify-start gap-2 md:gap-5 z-[3]" aria-label="call to action buttons">
                        <Button.ScrollIntoProduct />
                        <Button.HeroVideo />
                    </div>
                    <div className="w-full md:w-8/12 xl:w-9/12 grid grid-cols-3 gap-3 md:gap-x-6 z-[4]" aria-label="reports">
                        <div className="font-mulish space-y-1 text-center">
                            <p className="text-xl md:text-4xl font-extrabold text-cwm_green">20+</p>
                            <p className="text-[0.7rem] md:text-sm font-medium">Video panduan</p>
                        </div>
                        <div className="font-mulish space-y-1 text-center">
                            <p className="text-xl md:text-4xl font-extrabold text-cwm_green">20+</p>
                            <p className="text-[0.7rem] md:text-sm font-medium">Materi guide book</p>
                        </div>
                        <div className="font-mulish space-y-1 text-center">
                            <p className="text-xl md:text-4xl font-extrabold text-cwm_green">200+</p>
                            <p className="text-[0.7rem] md:text-sm font-medium">Pembeli</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3 z-[3]" aria-label="right-side">
                    <Column className="md:mt-10">
                        <Image
                            src="/image/cover-1.jpg"
                            width={285} height={324}
                            alt="cover-1"
                            className="rounded-tl-[50px] w-full xl:w-[285px] h-[120px] md:h-[400px] xl:h-[324px] rounded-r-xl object-cover"
                        />
                        <Image
                            src="/image/cover-3.jpg"
                            width={285}
                            height={324}
                            alt="cover-3"
                            className="rounded-bl-[50px] w-full xl:w-[285px] h-[120px] md:h-[400px] xl:h-[324px] rounded-r-xl object-cover"
                        />
                    </Column>
                    <Column>
                        <Image
                            src="/image/cover-2.jpg"
                            width={285} height={324}
                            alt="cover-1"
                            className="rounded-tr-[50px] w-full xl:w-[285px] h-[120px] md:h-[400px] xl:h-[324px] rounded-l-xl object-cover"
                        />
                        <Image
                            src="/image/cover-4.jpg"
                            width={285}
                            height={324}
                            alt="cover-3"
                            className="rounded-br-[50px] w-full xl:w-[285px] h-[120px] md:h-[400px] xl:h-[324px] rounded-l-xl object-cover"
                        />
                    </Column>
                </div>
            </div>
        </section>
    )
}