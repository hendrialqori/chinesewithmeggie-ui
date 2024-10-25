"use client";

import React from "react";
import axios, { AxiosProgressEvent } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { API } from "#/constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const statusMap = {
    loading: false,
    success: false,
    error: false
}

export function DownloadFile({ encrypted }: { encrypted: string }) {
    const router = useRouter()
    const [status, setStatus] = React.useState(statusMap)
    const [progressValue, setProgressValue] = React.useState(0)

    function statusHandler(map: Partial<Record<keyof typeof statusMap, boolean>>) {
        setStatus(({ ...statusMap, ...map }))
    }

    function downloadFile(blob: Blob, filename: string) {
        // create object url
        const file = URL.createObjectURL(blob)

        // Create a link element to trigger the download
        const anchor = document.createElement('a')
        anchor.href = file
        anchor.download = filename

        // append achor into document boby
        document.body.appendChild(anchor)

        // Trigger the click event on the link to initiate the download
        anchor.click()

        // Clean up
        document.body.removeChild(anchor)

        // router.push("/")

        toast.success("Berhasil mendownload produk")
        setTimeout(() => {
            toast.success("Selamat belajar :)")
        }, 3000)
    }


    function downloadProgress(event: AxiosProgressEvent) {
        const progress = event.bytes
        setProgressValue(progress)
    }

    const requestAPI = React.useCallback(async () => {
        statusHandler({ loading: true })
        try {
            const res = await axios.get(`${API}/download/${encrypted}`, {
                responseType: "blob",
                onDownloadProgress: downloadProgress

            })
            const blob = res.data as Blob

            // eslint-disable-next-line
            //@ts-ignore
            const filename = res.headers.get("X-Filename")
            downloadFile(blob, filename)

            statusHandler({ loading: true, success: true })

        } catch (error) {
            console.error(error)
            statusHandler({ error: true })

            router.push("/404")

        } finally {
            statusHandler({ loading: false })
        }

        // eslint-disable-next-line
    }, [status])

    React.useEffect(() => {
        requestAPI()

        // eslint-disable-next-line
    }, [])

    return (
        <section className="relative min-h-dvh w-full font-mulish" aria-label="download-file">
            <AnimatePresence>
                {status.loading && (
                    <motion.div
                        initial={{ top: "2.5rem", opacity: 0 }}
                        animate={{ top: "1.25rem", opacity: 1 }}
                        exit={{ top: "-1.25rem", opacity: 0 }}
                        transition={{ duration: 0.5, bounce: false }}
                        className="max-w-[400px] absolute top-5 right-5 rounded-lg shadow-lg bg-slate-50 p-4"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-5">
                            <div>
                                <h1 className="font-semibold text-sm md:text-base">Hampir sampai</h1>
                                <p className="text-xs md:text-sm text-gray-500">pengunduhan file sedang berlangsung, jangan tutup halaman anda</p>
                            </div>
                            <div>
                                <p className="text-[0.65rem] text-gray-700">{progressValue} bytes</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}