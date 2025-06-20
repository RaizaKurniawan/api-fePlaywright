// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';

const validEmail = 'test@example.com';
const validPassword = '12345678';

// TC-001: Valid login
// @ts-ignore
test('TC-001 - Login success', async ({ request }) => {
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
    expect(res.status()).toBe(200);
    expect(body.data.token).toBeDefined();
});

// TC-002: Invalid Email
// @ts-ignore
test('TC-002 - Invalid email', async ({ request }) => {
    const res = await request.post('/auth/login', {
        data: {
            email: 'wrong@example.com',
            password: validPassword,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    expect(res.status()).toBe(401);
});

// TC-003: Invalid Password
// @ts-ignore
test('TC-003 - Invalid password', async ({ request }) => {
    const res = await request.post('/auth/login', {
        data: {
            email: validEmail,
            password: 'wrongpassword',
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    expect(res.status()).toBe(401);
});

// TC-004: Missing Fields
// @ts-ignore
test('TC-004 - Missing email and password', async ({ request }) => {
    const res = await request.post('/auth/login', {
        data: {},
        headers: {
            'Content-Type': 'application/json',
        },
    });

    expect([400, 422]).toContain(res.status());
});

// TC-005: SQL Injection attempt
// @ts-ignore
test('TC-005 - SQL injection attempt', async ({ request }) => {
    const res = await request.post('/auth/login', {
        data: {
            email: "' OR 1=1 --",
            password: 'anything',
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    expect([400, 401]).toContain(res.status());
});

// TC-006: Rate limiting
// @ts-ignore
test('TC-006 - Rate limiting', async ({ request }) => {
    const results = [];
    for (let i = 0; i < 105; i++) {
        const res = await request.post('/auth/login', {
            data: {
                email: 'rate@test.com',
                password: 'wrongpass',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        results.push(res.status());
    }

    const rateLimited = results.some(status => status === 429);
    expect(rateLimited).toBeTruthy();
});