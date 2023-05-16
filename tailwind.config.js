/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                "spin-slow": "spin 6s ease-in-out infinite",
            },
        },
    },
    plugins: [],
    prefix: "tw-", // Prevent conflicts with bootstrap & hidden class
    important: true,
};
