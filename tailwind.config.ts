import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          "'Cormorant Garamond'",
          "'Playfair Display'",
          "Didot",
          "'Bodoni MT'",
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "Times",
          "serif",
        ],
        sans: [
          "'Plus Jakarta Sans'",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        luxury: {
          cream: "#FAF7F2",
          sand: "#EFE9E0",
          gold: "#C8A97E",
          bronze: "#9C7E54",
          charcoal: "#1C1A19",
          muted: "#706861",
        },
      },
    },
  },
  plugins: [],
};
export default config;
