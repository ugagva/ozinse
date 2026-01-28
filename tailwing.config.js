const plugin = require("tailwindcss/plugin");



module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
        extend: {

            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
                inter: ["Inter", "sans-serif"],

            },
        },
    },
    plugins: [
        plugin(function ({ addComponents }) {
            addComponents({
                ".border-dash-all": {
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        padding: "2px",
                        background:
                            "repeating-linear-gradient(90deg, #6366f1, #6366f1 6px, transparent 6px, transparent 16px), repeating-linear-gradient(0deg, #6366f1, #6366f1 6px, transparent 6px, transparent 16px)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "content-box, border-box",
                        pointerEvents: "none",
                    },
                },
            });
        }),
    ],
};
