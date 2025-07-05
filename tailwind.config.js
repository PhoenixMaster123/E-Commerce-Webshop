/** @type {import('tailwindcss').Config} */
module.exports = {
    // Alle Dateien, in denen Tailwind-Klassen vorkommen
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],

    // Dark-Mode via Klasse <html class="dark">
    darkMode: "class",

    theme: {
        extend: {
            /* Beispiel-Erweiterungen — optional */
            colors: {
                brand: {
                    DEFAULT: "#2563eb",   // helles Blau
                    dark: "#1e40af",      // dunkles Blau für Dark-Mode
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
        },
    },

    plugins: [
        // Falls du Plugins wie @tailwindcss/forms o. ä. nutzen willst
        // require("@tailwindcss/forms"),
    ],
};
