import { test, expect, request } from '@playwright/test';

const promoTypes = ['teaser', 'home', 'promo'];

for (const type of promoTypes) {
    // @ts-ignore
    test(`Promo - valid type '${type}' returns data`, async ({ request }) => {
        const res = await request.get(`/pages/promo?type=${type}`);
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(Array.isArray(body)).toBeTruthy();
        for (const item of body) {
            expect(item).toHaveProperty('CardId');
            expect(item).toHaveProperty('Title');
            expect(item).toHaveProperty('IsPublished');
            expect(item).toHaveProperty('ImageUrl');
        }
    });
}

// @ts-ignore
test('Promo - invalid type returns empty or 400', async ({ request }) => {
    const res = await request.get('/pages/promo?type=invalid_type');
    expect([200, 400]).toContain(res.status());
});