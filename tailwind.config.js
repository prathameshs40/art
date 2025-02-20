/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // darkMode:"class",
      colors: {
        "primary-100": "#BFEAFC",
        "primary-200": "#80D6FA",
        "primary-300": "#40c1f7",
        "primary-400": "#00acf4",
        "primary-500": "#0081b7",
        "primary-600": "#00567a",
        "primary-700": "#002b3d",
        "danger-100": "#fcbfc2",
        "danger-200": "#fa8084",
        "danger-300": "#f74047",
        "danger-400": "#f40009",
        "danger-500": "#b70007",
        "danger-600": "#7a0005",
        "danger-700": "#3d0002",
        "success-100": "#e2ffd0",
        "success-200": "#c5ffa1",
        "success-300": "#a8ff72",
        "success-400": "#8bff43",
        "success-500": "#68bf32",
        "success-600": "#468022",
        "success-700": "#234011",
        "warning-100": "#fffad5",
        "warning-200": "#fff5ab",
        "warning-300": "#fff080",
        "warning-400": "#ffeb56",
        "warning-500": "#bfb041",
        "warning-600": "#80762b",
        "warning-700": "#403b16",
        "prime-white-1": "#ffffff",
        "prime-white-2": "#fefeff",
        "prime-white-3": "#fdfdff",
        "prime-white-4": "#fcfcff",
        "prime-white-5": "#fbfbff",
        "prime-dark-1": "#14110f",
        "prime-dark-2": "#0f0d0b",
        "prime-dark-3": "#0a0908",
        "prime-dark-4": "#050404",
        "prime-dark-5": "#352821",
        "prime-lines": "#e7e7e7",
        "prime-lines-2": "#1d1916",
      },
      letterSpacing: {
        prime: ".25em",
      },
      fontFamily: {
        Allura: ["Allura"],
        JosefinSans: ["Josefin Sans"],
      },
      gap: {
        pixel: "1px",
      },
    },
  },
  plugins: [],
};
