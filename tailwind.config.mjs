/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundColor: {
        'primary-yellow': '#F5C519',
      },
      textColor: {
        'link-blue': '#136CB2',
        'link-blue-alt': 'rgb(87,153,239)',
        'desc-gray': 'rgba(0,0,0,0.6)',
        'link-blue-rt': '#0C89CA',
        'secondary-gray': 'rgba(0,0,0,.54)',
      },
    },
    fontFamily: {
      franklin: 'Libre Franklin Variable',
      neue: 'Bebas Neue',
      'imdb-roboto': 'Roboto,Helvetica,Arial,sans-serif',
    },
  },
  plugins: [],
};
