import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { type AxiosError } from "axios"
import type { Success, Error, Transaction } from "#/@type"
import { API } from "#/constants"
import { useInstance } from "#/lib/axios-instance"
import { useCredential } from "#/lib/credential"
import { CheckoutFormType } from "#/validations/checkout-form-validation"

type Query = {
    page: number;
    limit: number
    start_date: string;
    end_date: string
}

export function useGetTransactiontList(query: Query) {
    const instance = useInstance()
    const { credential } = useCredential()

    type Params = { signal: AbortSignal }

    const queries = new URLSearchParams()
    queries.set("page", query.page.toString())
    queries.set("limit", query.limit.toString())
    queries.set("start_date", query.start_date)
    queries.set("end_date", query.end_date)

    const GET = async ({ signal }: Params) => {
        const req = await instance(credential?.access_token ?? "")
            .get(`${API}/transaction/list?${queries.toString()}`, {
                signal
            })
        return req.data
    }

    return useQuery<Success<Transaction[]>, AxiosError<Error>>({
        queryKey: ["TRANSACTION/LIST", query],
        queryFn: GET
    })
}

export function useCreateInvoice() {
    type CreateInvoice = Omit<CheckoutFormType, "confirmEmail"> & {
        productId: string,
    }

    const POST = async (invoice: CreateInvoice) => {
        const req = await axios.post(`${API}/payment/invoice/create`, invoice)
        return req.data
    }

    return useMutation<
        Success<{ invoiceUrl: string }>,
        AxiosError<Error>,
        CreateInvoice>({
            mutationFn: POST
        })
}

export function useExportCsv(query: Pick<Query, "start_date" | "end_date">) {
    const instance = useInstance()
    const { credential } = useCredential()

    type Params = { signal: AbortSignal }

    const queries = new URLSearchParams()
    queries.set("start_date", query.start_date)
    queries.set("end_date", query.end_date)

    const GET = async ({ signal }: Params) => {
        const req = await instance(credential?.access_token ?? "")
            .get(`${API}/transaction/export?${queries.toString()}`, { signal, responseType: "blob" })
        return req.data
    }

    return useQuery<Blob, AxiosError<Error>>({
        queryKey: ["EXPORT/CSV"],
        queryFn: GET,
        enabled: false
    })

}