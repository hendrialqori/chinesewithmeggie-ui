"use client";

import React from "react"
import Image from "next/image"
import { Dropdown } from "./faq-dropdown";
import blue_circle_shape from "#/assets/svg/blue-circle-shape.svg?url"

function BlueCircleShape() {
    return (
        <Image
            src={blue_circle_shape}
            className="size-[23rem] absolute bottom-0 -left-20 z-[1] opacity-30 md:opacity-100"
            width={288}
            height={288}
            alt="blue_circle_shape"
        />
    )
}

function FAQ() {
    return (
        <section className="py-10 md:py-24 relative overflow-hidden">
            <BlueCircleShape />
            <div className="landing-page-container2nd grid grid-cols-1 lg:grid-cols-2 gap-14">
                <div className="flex flex-col-reverse md:flex-col items-center gap-2">
                    <div className="text-center space-y-1 md:space-y-2">
                        <h2 className="font-fredoka font-bold text-2xl xl:text-[2rem]">Frequently Asked Questions</h2>
                        <h3 className="font-fredoka font-bold text-base md:text-lg xl:text-xl text-[#5D5D5D]">Meggie jawab pertanyaan kalian</h3>
                    </div>
                    <Image
                        src="/image/faq.png"
                        alt="faq"
                        height={497}
                        width={392}
                        className="w-4/12 md:w-5/12 xl:w-6/12"
                    />
                </div>
                <div className="" aria-label="description">
                    <Dropdown
                        ask="1. Apakah guide book ini cocok untuk pemula?"
                        answer="Tentu saja! guide book ini dirancang untuk semua level, termasuk pemula. Materinya mudah dipahami dan langsung bisa dipraktikkan!"
                    />
                    <Dropdown
                        ask="2. Berapa lama supaya aku bisa ngobrol dengan Bahasa Mandarin setelah belajar dari guide book ini?"
                        answer="Banyak loh dari temen-temen yang udah beli guide book ini bilang kalo kalian rajin latihan, Bahasa Mandarinnya pasti bisa kepake banget! Setiap orang proses belajar pastinya beda-beda ya, tapi guide book ini bakal ngebantu mempercepat proses belajar kamu."
                    />
                    <Dropdown
                        ask="3. Dimana aku bisa mengakses guide book ini?"
                        answer="Guide book ini bisa diakses di mana saja loh! Smartphone, tablet, PC, dan laptop—belajar di mana saja, kapan saja!"
                    />
                    <Dropdown
                        ask="4. Apakah bisa interaksi dan ngobrol langsung dengan Meggie?"
                        answer="Materi menggunakan video rekaman. Kalau kalian ada pertanyaan, feel free untuk DM Meggie di Instagram ya!"
                    />
                    <Dropdown
                        ask="5. Apakah saya perlu memiliki pengetahuan dasar tentang bahasa Mandarin sebelum membaca ebook ini ?"
                        answer="Tidak perlu ya! Guide book ini cocok banget untuk semua level, termasuk yang belum pernah belajar Bahasa Mandarin sebelumnya"
                    />
                    <Dropdown
                        ask="6. Akses materi berlaku sampai kapan?"
                        answer="Akses untuk video materi berlaku selamanya! Kamu bisa tonton dan pelajari ulang sesuai dengan kecepatan belajar kamu!"
                    />
                    
                </div>
            </div>
        </section>
    )
}

export { FAQ }