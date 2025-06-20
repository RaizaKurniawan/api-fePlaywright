import { test, expect, request } from '@playwright/test';

const promoTypes = ['teaser', 'home', 'promo'];


// @ts-ignore

test('Quiz - valid mission_code', async ({ request }) => {
    const missionCode = 'weekly_001'; // Replace as needed
    const res = await request.get(`/pages/quiz?mission_code=${missionCode}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('MissionCode');
    expect(body).toHaveProperty('Question');
    expect(body).toHaveProperty('Answers');
    expect(body).toHaveProperty('Answer');
});