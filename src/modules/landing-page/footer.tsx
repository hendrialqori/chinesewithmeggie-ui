import React from "react";
import Image from "next/image"
import { LuInstagram } from "react-icons/lu";
import { FaTiktok } from "react-icons/fa6";
import china_flag from "#/assets/svg/china-flag.svg?url"
import green_blur_circle_shape from "#/assets/svg/green-blur-circle-shape.svg?url"
import * as Button from "./footer-button-action"

function Credits() {
    return (
        <div className="landing-page-container center-flex py-8 md:py-12 border-t border-[#D0D0D0]">
            <p className="text-[0.6rem] md:text-sm font-mulish text-center">All Right Reserved@2024 - chinesewithmeggie</p>
        </div>
    )
}

function GreenBlurCircleShape() {
    return (
        <Image
            src={green_blur_circle_shape}
            className="size-28 absolute bottom-5 md:bottom-10 right-[30%]"
            width={288}
            height={288}
            alt="green_blur_circle_shape"
        />
    )
}

function Footer() {
    return (
        <React.Fragment>
            <footer className="landing-page-container relative flex flex-col md:flex-row justify-between items-center gap-16 md:gap-0 pt-10 pb-10 md:pb-48">
                <GreenBlurCircleShape />
                <Button.ScrollIntoProduct />
                <div className="space-y-5" aria-label="right-side">
                    <div className="flex items-center justify-center md:justify-end">
                        <p className="font-fredoka font-semibold text-xs md:text-xl">Chinesewithmeggie</p>
                        <Image
                            src={china_flag} width={20} height={14} alt="china_flag"
                        />
                    </div>
                    <div className="center-flex justify-center md:justify-end gap-3">
                        <a href="https://www.instagram.com/chinesewithmeggie?igsh=MTBxeGswbXR0cDdrZg==" target="_blank" rel="noopener" aria-label="Instagram">
                            <LuInstagram className="text-2xl" />
                        </a>
                        <a href="https://www.tiktok.com/@chinesewithmeggie?_t=8qyAW1o6uUU&_r=1" aria-label="Twitter">
                            <FaTiktok className="text-xl" />
                        </a>
                    </div>
                    <p className="font-mulish text-[0.65rem] md:text-xs font-medium text-center md:text-left">Home  |  Product  |  Testimony  |  What will you get  |  FAQ</p>
                </div>
            </footer>
            <Credits />
        </React.Fragment>
    )
}

export { Footer }