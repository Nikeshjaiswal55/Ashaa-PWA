// postcss.config.js
export default {
    plugins: {
        '@tailwindcss/postcss': {},  // ✅ use this instead of just 'tailwindcss'
        autoprefixer: {},
    },
};
