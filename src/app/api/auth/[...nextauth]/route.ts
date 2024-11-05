import { AxiosError } from "axios";
import { User } from "next-auth";
import NextAuth from "next-auth/next";
import { login } from "#/services/auth-service";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Error, Credential } from "#/@type";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "email", label: "username" },
                password: { type: "password", label: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email ?? ""
                const password = credentials?.password ?? ""

                try {
                    const res = await login({ email, password })
                    return res?.data as unknown as User

                } catch (error) {
                    const err = error as AxiosError<Error>
                    throw new Error(JSON.stringify(err.response?.data, null, 2))
                }
            }
        })
    ],
    pages: {
        signIn: "/admin/login",
        signOut: "/admin/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: (props) => {
            const user = props.user as unknown as Credential | undefined
            const token = props.token as unknown as Credential

            if (user?.access_token) {
                token.access_token = user?.access_token
            }
            return { ...token, ...user }
        },
        async session(props) {
            const session = props.session
            const token = props.token
            // Save the JWT token to the session object
            session.user = token as typeof session.user

            return session;
        }
    }
})

export { handler as GET, handler as POST }