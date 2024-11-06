"use client";

import Script from "next/script";

export default function Analytic() {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-VESZQ7ZVEW"
                async
                onLoad={() => {
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                    }
                    gtag('js', new Date());

                    gtag('config', 'G-VESZQ7ZVEW');
                }}

            />
        </>
    )
}