import { test, expect, request } from '@playwright/test';

const promoTypes = ['teaser', 'home', 'promo'];


// @ts-ignore
test('Livestream - valid token returns show info', async ({ request }) => {
    const token = 'Bearer YOUR_JWT_TOKEN'; // replace with valid token
    const res = await request.get('/pages/livestream', {
        headers: {
            Authorization: token,
        },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('Show');
    expect(body).toHaveProperty('Url');
});

// @ts-ignore
test('Livestream - missing token returns 401', async ({ request }) => {
    const res = await request.get('/pages/livestream');
    expect(res.status()).toBe(401);
});