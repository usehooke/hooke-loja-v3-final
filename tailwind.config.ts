import type { Config } from "tailwindcss";

const config: Config = {
  // Aqui estava o erro: removemos o "src" dos caminhos
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hooke: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#6b7280',
          800: '#1f2937', 
          900: '#111827', 
          DEFAULT: '#000000',
        },
      },
    },
  },
  plugins: [],
};
export default config;