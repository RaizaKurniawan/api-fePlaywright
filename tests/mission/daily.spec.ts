// ==================== DAILY MISSION ====================
import { test, expect } from '@playwright/test';

const validEmail = 'test@example.com';
const validPassword = '12345678';

let authToken: string;

// Reuse login before each test
const getToken = async (request: any) => {
    const res = await request.post('/auth/login', {
        data: {
            email: validEmail,
            password: validPassword,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const body = await res.json();
    return body.data.token;
};

// TC-101: Daily mission first call
// @ts-ignore
test('TC-101 - Daily mission claimed once', async ({ request }) => {
    const token = await getToken(request);
    const res = await request.post('/mission/daily', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const body = await res.json();
    expect(res.status()).toBe(200);
    expect(["Mission Claimed", "Already Claimed"]).toContain(body.Status);
    expect(typeof body.CurrentToken).toBe('number');
});

// TC-102: Daily mission second call
// @ts-ignore
test('TC-102 - Daily mission already claimed', async ({ request }) => {
    const token = await getToken(request);
    // Call once
    await request.post('/mission/daily', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // Call again
    const res = await request.post('/mission/daily', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const body = await res.json();
    expect(body.Status).toBe('Already Claimed');
});

// TC-103: Daily mission without token
// @ts-ignore
test('TC-103 - Daily mission unauthorized', async ({ request }) => {
    const res = await request.post('/mission/daily');
    expect(res.status()).toBe(401);
});