import type { Config } from "tailwindcss";

export default {
  relative: true,
  content: ["./app/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 1s infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(70%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-2deg)",
            "-webkit-transform": "rotate(-2deg)",
          },
          "50%": {
            transform: "rotate(2deg)",
            "-webkit-transform": "rotate(2deg)",
          },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
