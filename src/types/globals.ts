export interface IError {
    title: string,
    description: string
}

export enum PaymentMethod {
    CRYPTOCURRENCY = 'CRYPTOCURRENCY',
    FIAT = 'FIAT'
}