import React from "react"
import type { Transaction } from "#/@type"
import {
    Table as TableRoot, TableBody,
    TableHeader, TableRow, TableHead, TableCell
} from "#/components/ui/table"
import { LuEye } from "react-icons/lu";
import dayjs from "dayjs"
import Portal from "#/components/ui/portal";
import { Preview } from "./transaction-preview";

type Props = {
    transactions: Transaction[] | undefined
}

function badgeColor(value: string) {
    const baseClass = "w-[5.5rem] px-4 py-[2px] rounded-full center-flex text-[0.8rem]"

    switch (value) {
        case "PENDING":
            return `bg-yellow-300 ${baseClass}`
        case "SETTLED":
            return `bg-green-400 text-white ${baseClass}`
        case "FAILED":
            return `bg-red-600 text-white ${baseClass}`
        default:
            return `bg-gray-300 ${baseClass}`
    }
}

export function TableData({ transactions }: Props) {
    const [transaction, setTransaction] = React.useState<Transaction | null>(null)

    function showDetailTransaction(transaction: Transaction) {
        return () => setTransaction(transaction)
    }

    function closePreview() {
        setTransaction(null)
    }

    return (
        <React.Fragment>
            <div className="relative w-full overflow-auto">
                <TableRoot className="min-w-max w-full">
                    <TableHeader className="bg-[#F2F4F7]">
                        <TableRow className="text-sm font-medium">
                            <TableHead>Date</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[25%]">Product</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions?.map((trx, i) => (
                            <TableRow key={i} className="text-xs lg:text-sm font-medium">
                                <TableCell className="py-4 px-2 text-nowrap">
                                    {dayjs(trx.createdAt)
                                        .locale("id")
                                        .format("ddd, DD MMMM YYYY HH:mm")
                                    }
                                </TableCell>
                                <TableCell className="py-4 px-2 text-nowrap">{trx.email}</TableCell>
                                <TableCell className="py-4 px-2 text-nowrap">{trx.phone}</TableCell>
                                <TableCell className="py-4 px-2">
                                    <div
                                        className={badgeColor(trx.status!)}
                                        aria-label="badge"
                                    >
                                        <span>{trx.status ?? "No status"}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-2">{trx.product.title}</TableCell>
                                <TableCell>
                                    <button
                                        className="hover:border hover:bg-white rounded-lg size-8 center-flex"
                                        onClick={showDetailTransaction(trx)}
                                    >
                                        <LuEye className="text-xl" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableRoot>
            </div>
            <Portal isOpen={Boolean(transaction)}>
                <Preview
                    transaction={transaction}
                    onClose={closePreview}
                />
            </Portal>
        </React.Fragment>
    )
}

export function TableSkeleton({ rows }: { rows: number }) {
    return (
        <div className="w-full">
            <div className="bg-gray-200 animate-pulse h-10" aria-label="table header skeleton " />
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="bg-[#F2F4F7] animate-pulse h-10 mb-1" aria-label="table header skeleton " />
            ))}
        </div>
    )
}