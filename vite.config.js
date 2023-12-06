import laravel from 'laravel-vite-plugin'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            laravel({
                refresh: true,
                input: [
                    'resources/css/site.css',
                    'resources/js/site.js',
                    'resouces/js/routing.js',
                    'resources/js/news_filtering.js'
                ]
            })
        ],
        server: {
            open: env.APP_URL
        }
    }
});
