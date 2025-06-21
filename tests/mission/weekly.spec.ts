// ==================== WEEKLY MISSION ====================

import { test, expect } from '@playwright/test';

const validEmail = 'test@example.com';
const validPassword = '12345678';

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

// TC-104: Weekly mission valid claim
// @ts-ignore
test('TC-104 - Weekly mission claimed once', async ({ request }) => {
    const token = await getToken(request);
    const res = await request.post('/mission/weekly', {
        data: {
            MissionCode: 'WEEKLY01',
        },
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const body = await res.json();
    expect(res.status()).toBe(200);
    expect(["Mission Claimed", "Already Claimed"]).toContain(body.Status);
    expect(typeof body.CurrentToken).toBe('number');
});

// TC-105: Weekly mission already claimed
// @ts-ignore
test('TC-105 - Weekly mission already claimed', async ({ request }) => {
    const token = await getToken(request);
    await request.post('/mission/weekly', {
        data: {
            MissionCode: 'WEEKLY01',
        },
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const res = await request.post('/mission/weekly', {
        data: {
            MissionCode: 'WEEKLY01',
        },
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const body = await res.json();
    expect(body.Status).toBe('Already Claimed');
});

// TC-106: Weekly mission with missing MissionCode
// @ts-ignore
test('TC-106 - Weekly mission missing MissionCode', async ({ request }) => {
    const token = await getToken(request);
    const res = await request.post('/mission/weekly', {
        data: {},
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    expect([400, 422]).toContain(res.status());
});

// TC-107: Weekly mission unauthorized
// @ts-ignore
test('TC-107 - Weekly mission without token', async ({ request }) => {
    const res = await request.post('/mission/weekly', {
        data: {
            MissionCode: 'WEEKLY01',
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(res.status()).toBe(401);
});