import { test, expect, request } from '@playwright/test';

const promoTypes = ['teaser', 'home', 'promo'];


// @ts-ignore
test('Product - fetch all product list', async ({ request }) => {
    const res = await request.get('/pages/product');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    for (const product of body) {
        expect(product).toHaveProperty('imageUrl');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('partner');
        expect(product).toHaveProperty('url');
    }
});
