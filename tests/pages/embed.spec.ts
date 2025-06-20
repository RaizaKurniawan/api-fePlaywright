import { test, expect, request } from '@playwright/test';

const promoTypes = ['teaser', 'home', 'promo'];


// @ts-ignore
test('Embed Video - get list', async ({ request }) => {
    const res = await request.get('/pages/embed');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    for (const video of body) {
        expect(video).toHaveProperty('imageUrl');
        expect(video).toHaveProperty('name');
        expect(video).toHaveProperty('videoUrl');
    }
});