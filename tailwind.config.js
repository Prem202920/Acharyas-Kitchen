/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#873415",
        "primary-container": "#a64b2a",
        "on-primary": "#ffffff",
        "on-primary-container": "#ffded4",
        "secondary": "#556343",
        "secondary-container": "#d5e5bd",
        "on-secondary-container": "#596747",
        "tertiary": "#77401c",
        "tertiary-container": "#945732",
        "background": "#fff8f5",
        "surface": "#fff8f5",
        "surface-bright": "#fff8f5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fbf2ed",
        "surface-container": "#f5ece7",
        "surface-container-high": "#efe6e2",
        "surface-container-highest": "#e9e1dc",
        "on-surface": "#1e1b18",
        "on-surface-variant": "#56423c",
        "outline": "#89726b",
        "outline-variant": "#dcc1b8",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
      },
      fontFamily: {
        "display": ["EB Garamond", "serif"],
        "headline": ["EB Garamond", "serif"],
        "body": ["Plus Jakarta Sans", "sans-serif"],
        "label": ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em" }],
        "display-lg-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.01em" }],
        "headline-lg": ["32px", { lineHeight: "40px" }],
        "headline-md": ["24px", { lineHeight: "32px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        "body-md": ["16px", { lineHeight: "24px" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.05em" }],
        "label-md": ["12px", { lineHeight: "16px" }],
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "9999px",
      },
      spacing: {
        "unit": "8px",
        "gutter": "24px",
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        "section-gap": "80px",
        "container-max": "1200px",
      },
      maxWidth: {
        "container-max": "1200px",
      },
      boxShadow: {
        "soft": "0 20px 25px -5px rgba(135, 52, 21, 0.04), 0 10px 10px -5px rgba(135, 52, 21, 0.02)",
        "soft-hover": "0 25px 30px -5px rgba(135, 52, 21, 0.08), 0 15px 15px -5px rgba(135, 52, 21, 0.04)",
      }
    },
  },
  plugins: [],
}
