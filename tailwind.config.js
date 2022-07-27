/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          light: "#ede0e0",
					dark: "#120202"
        },
        'real-red': {
          50: "#e9c1c2",
          100: "#e5a3a4",
          200: "#dc6b6f",
          300: "#d13d41",
          400: "#c2191f",
          500: "#af0309",
          600: "#960005",
          700: "#790004",
          800: "#590002",
          900: "#360204",
        },
        'shallow-water': {
          50: "#e6def5",
          100: "#dfdbfd",
          200: "#c8d8ff",
          300: "#b4e2ff",
          400: "#9feeff",
          500: "#8af3ff",
          600: "#67cce2",
          700: "#458cb9",
          800: "#264386",
          900: "#170f4e",
        },
        cyprus: {
          50: "#c5bbda",
          100: "#9d99c6",
          200: "#6278a1",
          300: "#3a687f",
          400: "#1f5960",
          500: "#104547",
          600: "#082f34",
          700: "#051c27",
          800: "#030c1e",
          900: "#040217",
        },
        'matt-blue': {
          50: "#dec9ec",
          100: "#c9b3ea",
          200: "#8c88e5",
          300: "#617ede",
          400: "#407cd1",
          500: "#276fbf",
          600: "#1752a6",
          700: "#0e2a86",
          800: "#0d0962",
          900: "#1b063b",
        },
        'primary': "#c2191f",
        'secondary': "#ede0e0",
        'accent': "#617ede",
      }
    }
  },
  plugins: [],
};
