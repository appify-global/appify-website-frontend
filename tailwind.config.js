/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                debug: 'violet',
                brgray: "#E3E5EE",
                brblue: "#0016EC"
            },
            boxShadow: {
                'complex-inset': '0px 2px 20px 2px #3535350D inset, 0px 0px 5px 0px #FFFFFF26 inset, -1px -1px 0px 0px #FFFFFF66 inset, 1px 0.5px 0px 0px #FFFFFF99 inset',
                'complex-outset': '0px 8px 72px -5px #0000001A, 0px 2px 30px 0px #0000000D',
            },
        },
        fontFamily: {
            Aeonik: ["Aeonik"],
            AeonikBold: ["AeonikBold"],
            AeonikMedium: ["AeonikMedium"],
        },
    },
    plugins: [
        require('tailwindcss-3d')
    ],
};
