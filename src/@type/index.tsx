export type Meta = {
    page: number | null,
    limit: number | null,
    from: number | null,
    to: number | null,
    total_row: number | null
}

export type Success<T> = {
    data: T;
    meta: Meta
    message: string
}

export type Error = {
    type: "Validation Error" | "Response Error" | "File Upload Error" | "Unknown Error";
    errors: unknown
    message: string
}

export type Testimony = {
    // theme: "orange" | "blue" | "green"
    image: string;
    message: string;
    person: { name: string, age: number; job: string }
}

export type Credential = {
    id: number;
    username: string;
    email: string;
    password: string;
    access_token: string
    createdAt: string;
}

export type Product = {
    id: string,
    title: string,
    image: string,
    originalPrice: number,
    discountPrice: number,
    isOffer: boolean,
    zipPath: string;
    description: string,
    createdAt?: string | Date,
    updatedAt?: string | Date
}

export type Transaction = {
    id: 8,
    name: string;
    email: string,
    phone: number,
    status: string | null,
    product: Product,
    invoiceId: string;
    invoiceUrl: string;
    createdAt: string,
    updatedAt: string
}
