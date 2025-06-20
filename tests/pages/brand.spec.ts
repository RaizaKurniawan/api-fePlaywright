import { test, expect, request } from '@playwright/test';

const promoTypes = ['teaser', 'home', 'promo'];


// @ts-ignore
test('Brand - fetch all brand data', async ({ request }) => {
    const res = await request.get('/pages/brand');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    for (const brand of body) {
        expect(brand).toHaveProperty('imageUrl');
        expect(brand).toHaveProperty('alt');
    }
});