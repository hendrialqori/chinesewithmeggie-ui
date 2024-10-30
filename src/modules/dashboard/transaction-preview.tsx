import Image from "next/image"
import { Transaction } from "#/@type"
import { STATIC } from "#/constants"
import { priceFormat } from "#/lib/utils"
import dayjs from "dayjs"
import { IoMdClose } from "react-icons/io"

type Props = {
    transaction: Transaction | null
    onClose: () => void
}

function Info({ property, value }: { property: string, value: string }) {
    return (
        <div aria-label="information item">
            <h2 className="text-sm font-bold -tracking-wider select-none">{property}</h2>
            <p className="text-sm font-medium leading-4 text-gray-600">{value}</p>
        </div>
    )
}


export function Preview({ transaction, onClose }: Props) {
    return (
        <div className="w-[768px] h-max grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden bg-white">
            <div className="bg-gray-200">
                <div className="h-[180px] md:h-[220px]">
                    <Image
                        src={STATIC + "/" + transaction?.product.image}
                        width={500}
                        height={500}
                        alt="product-avatar"
                        className="size-full object-cover"
                    />
                </div>
                <div className="h-1/3 flex flex-col justify-center py-2">
                    <h2 className="text-sm md:text-base font-fredoka font-bold text-center">{transaction?.product.title}</h2>
                    <div className="font-mulish center-flex flex-col gap-1 py-2">
                        <p className="line-through text-xs md:text-sm font-medium">Rp {priceFormat(transaction?.product.originalPrice ?? 0)}</p>
                        <p className="font-extrabold text-sm md:text-base">Rp {priceFormat(transaction?.product.discountPrice ?? 0)}</p>
                    </div>
                </div>
            </div>
            <div className="px-5 pt-6 pb-8 font-mulish space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold -tracking-wider">Transaction detail</h2>
                    <button onClick={onClose}>
                        <IoMdClose className="text-xl" />
                    </button>
                </div>
                <div className="space-y-3" aria-label="transcation information">
                    <Info property="Invoice ID" value={transaction?.invoiceId ?? "-"} />
                    <Info property="Name" value={transaction?.name ?? "-"} />
                    <Info property="Email" value={transaction?.email ?? "-"} />
                    <Info property="Phone" value={transaction?.phone.toString() ?? "-"} />
                    <Info property="Time" value={dayjs(transaction?.createdAt)
                        .subtract(7, "hour")
                        .format("ddd, DD MMMM YYYY HH:mm")
                    } />
                    <Info property="Status" value={transaction?.status ?? "-"} />
                    <Info property="Invoice link" value={transaction?.invoiceUrl ?? "-"} />
                </div>
            </div>
        </div>
    )
}

