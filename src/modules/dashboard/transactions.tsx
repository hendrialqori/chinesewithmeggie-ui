"use client";

import React from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import { DateType, type DateValueType } from "react-tailwindcss-datepicker";

import { TbFileTypeCsv } from "react-icons/tb";
import Datepicker from "#/components/ui/date-picker";
import Flow from "#/components/control-flow";
import { useGetTransactiontList, useExportCsv } from "#/services/transaction-service";
import { Pagination } from "./transaction-pagination";
import { TableData, TableSkeleton } from "./transaction-table";


export default function Transactions() {
    const limit = 5
    const [datePicker, setDatePicker] = React.useState<DateValueType>({} as DateValueType)
    const [currentPage, setCurrentPage] = React.useState(1)

    const start_date = datePicker?.startDate ? dayjs(datePicker?.startDate).format("YYYY-MM-DD") : ""
    const end_date = datePicker?.endDate ? dayjs(datePicker?.endDate).format("YYYY-MM-DD") : ""

    const { data, isPending, isSuccess } = useGetTransactiontList({
        page: currentPage,
        limit,
        start_date,
        end_date
    })

    const { refetch } = useExportCsv({ start_date, end_date })

    function handleChangeDatePicker(date: DateValueType) {
        setDatePicker({ startDate: date?.startDate as DateType, endDate: date?.endDate as DateType })
    }

    async function exportCsv() {
        try {
            const { data: csv } = await refetch()

            // create object url
            const file = URL.createObjectURL(csv as Blob)

            // Create a link element to trigger the download
            const anchor = document.createElement('a')
            anchor.href = file
            anchor.download = "transactions-report.csv"

            // append achor into document boby
            document.body.appendChild(anchor)

            // Trigger the click event on the link to initiate the download
            anchor.click()

            // Clean up
            document.body.removeChild(anchor)

        } catch (error) {
            toast.error("Gagal mengunduh file transactions report")
        }
    }

    function prevPage() {
        setCurrentPage((prev) => Math.max(1, prev + -1))
    }

    function nextPage() {
        if (data?.meta.to === data?.meta.total_row) {
            return
        }
        setCurrentPage((prev) => {
            const acc = prev + 1
            return acc
        })
    }

    return (
        <div className="space-y-10">
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <h2 className="font-fredoka -tracking-wide text-base md:text-lg font-semibold text-nowrap">Transactions history</h2>
                <div className="w-full flex flex-col md:flex-row items-center justify-end gap-4">
                    <div className="w-full md:max-w-[300px]" aria-label="date picker container">
                        <Datepicker
                            date={datePicker}
                            onChange={handleChangeDatePicker}
                            disabled={isPending}
                        />
                    </div>
                    <button
                        className="w-full md:w-max center-flex gap-x-2 rounded-lg bg-black text-white px-3 md:px-4 py-2 outline-double hover:outline-black"
                        onClick={exportCsv}
                    >
                        <TbFileTypeCsv className="text-xl" />
                        <p className="text-xs md:text-sm font-medium">Export transaction</p>
                    </button>
                </div>
            </div>
            <Flow>
                <Flow.If condition={isPending}>
                    <TableSkeleton rows={5} />
                </Flow.If>
                <Flow.ElseIf condition={isSuccess}>
                    <TableData transactions={data?.data} />
                    <Pagination
                        meta={data?.meta}
                        onPrevious={prevPage}
                        onNext={nextPage}
                    />
                </Flow.ElseIf>
                <Flow.Else>
                    <p className="text-xs md:text-sm lg:text-base text-red-500">
                        Something when wrong!
                    </p>
                </Flow.Else>
            </Flow>

        </div>
    )
}
