/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sssm: "300px",
            ssm: "350px",
            sm: "413px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1250px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            animation: {
                "spin-slow": "spin 6s ease-in-out infinite",
            },
            colors: {
                "gray-rgba(91, 91, 91, 0.5)": "rgba(91, 91, 91, 0.5)",
            },
            backgroundImage: {
                // "bg-app": "url('../src/svg/bgimage')",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
    prefix: "tw-", // Prevent conflicts with bootstrap & hidden class
    important: true,
};
