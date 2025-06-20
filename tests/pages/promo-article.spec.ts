import { test, expect, request } from '@playwright/test';

const promoTypes = ['teaser', 'home', 'promo'];

// @ts-ignore
test('Promo Article - valid ID', async ({ request }) => {
    const promoId = 1; // Replace with real ID during test setup
    const res = await request.get(`/pages/promo/${promoId}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('ArticleContent');
});

// @ts-ignore
test('Promo Article - invalid ID returns 404', async ({ request }) => {
    const res = await request.get(`/pages/promo/999999`);
    expect([404, 400]).toContain(res.status());
});
