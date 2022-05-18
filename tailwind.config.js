module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ["night", "dark", "cmyk"],
    },
    plugins: [require("daisyui")],
};
