import Image from "next/image"
import yellow_round_shape from "#/assets/svg/yellow-round-shape.svg?url"

function YellowRoundShape() {
    return (
        <Image
            src={yellow_round_shape}
            width={135}
            height={135}
            className="size-10 md:size-20 lg:size-32 rounded-full"
            alt="yellow-round-shape"
        />
    )
}

function UniqueSellingPoint() {
    return (
        <section className="py-2 md:py-24" aria-label="unique selling point">
            <div className="landing-page-container2nd">
                <YellowRoundShape />
            </div>
            <div className="landing-page-container2nd grid grid-cols-1 xl:grid-cols-8 xl:grid-rows-2 gap-3 md:gap-5 z-10">
                <h2 className="font-bold text-center md:text-left text-2xl xl:text-3xl font-fredoka col-span-5 md:col-span-3 center-flex -translate-y-7 md:-translate-y-12  xl:translate-y-7">
                    Kenapa harus Chinese With Meggie ?
                </h2>
                <div className="relative flex col-span-5 rounded-3xl bg-[#F07B48]/15" aria-label="usp-description">
                    <div className="w-8/12 md:w-7/12 pl-7 py-4 md:py-12 space-y-1.5 md:space-y-3 flex flex-col justify-center items-start">
                        <h3 className="font-fredoka font-bold text-base md:text-lg xl:text-xl">Mudah dipakai, kapan saja</h3>
                        <p className="font-mulish font-semibold text-xs md:text-base !leading-[140%] md:!leading-[150%]">
                            Guidebook ini bisa kamu akses di mana pun dan kapan pun. Mau belajar sambil ngopi di kafe pas lagi di perjalanan? Gampang banget!
                        </p>
                    </div>
                    <div className="w-4/12 md:w-5/12 relative rounded-r-3xl h-full overflow-hidden">
                        <Image
                            src="/image/icon3D-1.png"
                            width={220}
                            height={217}
                            alt="icon3D-1"
                            className="absolute right-1 md:right-8 top-1/2 -translate-y-1/2 w-[70px] md:w-[220px] md:h-[217px] object-contain z-[3]"
                        />
                        <div className="hidden md:block absolute size-40 md:size-80 rounded-full bg-[#FEC7B0] -right-[50px] md:-right-[100px] -top-[50px] md:-top-[100px]" />
                        <div className="hidden md:block absolute size-40 md:size-80 rounded-full bg-[#F07B48] -right-[80px] md:-right-[130px] -bottom-[50px] md:-bottom-[150px] z-[2]" />
                    </div>
                </div>
                <div className="relative flex col-span-5 md:col-span-4 rounded-3xl bg-[#ADC482]/15" aria-label="usp-description">
                    <div className="w-4/12 md:w-5/12 relative rounded-l-3xl h-full overflow-hidden">
                        <div className="hidden md:block absolute size-80 rounded-full bg-[#EDFFCB] -left-[220px] md:-left-[170px] -top-[50px] md:-top-[100px]" />
                        <div className="hidden md:block absolute size-80 rounded-full bg-[#ADC482] -bottom-[200px] md:-bottom-[150px] -left-[220px] md:-left-[150px] z-[2]" />
                        <Image
                            src="/image/icon3D-2.png"
                            width={180}
                            height={174}
                            alt="icon3D-2"
                            className="absolute top-1/2 -translate-y-1/2 w-[70px] md:w-[180px] md:h-[174px] object-contain z-[3]"
                        />
                    </div>
                    <div className="w-9/12 pl-2 md:pl-0 pr-4 md:pr-8 py-4 md:py-12 space-y-1.5 md:space-y-3 flex flex-col justify-center items-start">
                        <h3 className="font-fredoka font-bold text-base md:text-lg xl:text-xl">Mudah Dibaca, Praktis banget</h3>
                        <p className="font-mulish font-semibold text-xs md:text-base !leading-[140%] md:!leading-[150%]">
                            Meggie bikin simple dengan guidebook yang colorful, video interactive, dan gambar yang lucu. dijamin kamu gak bosen deh!
                        </p>
                    </div>
                </div>
                <div className="relative flex col-span-5 md:col-span-4 rounded-3xl bg-[#6E9FB8]/15" aria-label="usp-description">
                    <div className="w-8/12 md:w-7/12 pl-7 py-4 md:py-12 space-y-1.5 md:space-y-3 flex flex-col justify-center items-start">
                        <h3 className="font-fredoka font-bold text-base md:text-lg xl:text-xl">Mudah dicerna, 100% relatable</h3>
                        <p className="font-mulish font-semibold text-xs md:text-base !leading-[140%] md:!leading-[150%]">
                            Materi diambil dari bahasa sehari-sehari, bukan dari text book!  Nggak ribet, langsung ngerti dan langsung bisa ngobrol!
                        </p>
                    </div>
                    <div className="w-5/12 relative rounded-r-3xl h-full overflow-hidden">
                        <Image
                            src="/image/icon3D-3.png"
                            width={199}
                            height={183}
                            alt="icon3D-3"
                            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 w-[70px] md:w-[199px] md:h-[183px] object-contain z-[3]"
                        />
                        <div className="hidden md:block absolute size-80 rounded-full bg-[#D2F0FF] -right-[240px] md:-right-[130px] -top-[100px]" />
                        <div className="hidden md:block absolute size-80 rounded-full bg-[#6E9FB8] -right-[220px] md:-right-[130px] -bottom-[200px] md:-bottom-[150px] z-[2]" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export { UniqueSellingPoint }