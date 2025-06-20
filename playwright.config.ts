import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: 'https://game-api-bcaumkm-dev.agatedev.net/', // replace with your actual base URL
    },
});
