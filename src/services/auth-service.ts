import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios"
import { API } from "#/constants";
import type { Credential, Success, Error } from "#/@type";
import { useInstance } from "#/lib/axios-instance";
import { useCredential } from "#/lib/credential";

type Params = Pick<Credential, "email" | "password">

export async function login({ email, password }: Params): Promise<Success<{ access_token: string }> | undefined> {
    const req = await axios.post(`${API}/auth/login`, { email, password }, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })

    return await req.data
}


export async function getProfile(): Promise<Success<Credential>> {
    const req = await axios.get(`${API}/auth/profile`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }

    })
    return req.data
}


export function useProfile() {
    const instance = useInstance()
    const { credential } = useCredential()

    const GET = async () => {
        const req = await instance(credential?.access_token ?? "")
            .get(`/auth/credential`)
        return req.data
    }

    return useQuery<Success<Credential>, AxiosError<Error>>({
        queryKey: ["PROFILE"],
        queryFn: GET,
        staleTime: 1 * (60 * 1000)
    })
}

export function useUpdateProfile() {
    const instance = useInstance()
    const { credential } = useCredential()

    type Payload = {
        username: string;
        email: string;
        password: string
    }

    const UPDATE = async (payload: Payload) => {
        const req = await instance(credential?.access_token ?? "")
            .put(`/auth/update`, payload)
        return req.data
    }

    return useMutation<
        Success<Omit<Payload, "password">>,
        AxiosError<Error>,
        Payload>({
            mutationFn: UPDATE
        })

}