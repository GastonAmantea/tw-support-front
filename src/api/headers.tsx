'use server';

export async function getHeaders() {
    const header = {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'SECRET-API-KEY': `${process.env.API_KEY}`,
    }  
    return header;
}