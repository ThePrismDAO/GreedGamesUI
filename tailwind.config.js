const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,jsx,ts,tsx}', "./components/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: true, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      amber: colors.amber,
      black: colors.black,
      blue: colors.blue,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      slate: colors.slate,
      gray: colors.gray,
      neutral: colors.neutral,
      stone: colors.stone,
      green: colors.green,
      indigo: colors.indigo,
      lime: colors.lime,
      orange: colors.orange,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      sky: colors.sky, //warn - As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.
      teal: colors.teal,
      violet: colors.violet,
      yellow: colors.amber,
      white: colors.white,
    },
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
      serif: ['ui-serif', 'Georgia', ...defaultTheme.fontFamily.serif],
      mono: ['Source Code Pro', 'monospace', ...defaultTheme.fontFamily.mono],
    },
    extend:{
      fontSize: {
        '3xs': '.65rem',
        '2xs': '.7rem'
      },
      transitionProperty: {
        ...defaultTheme.transitionProperty,
        width: "width",
        height: "height",
        rotate: "rotate"
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      }
    }
    // extend: {
    //   fontFamily: {
    //     // sans: ['Nunito', ...defaultTheme.fontFamily.sans],
    //     // mono: ['SFMono-Regular', ...defaultTheme.fontFamily.mono],
    //     sans: ['ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
    //     serif: ['ui-serif', 'Georgia', ...defaultTheme.fontFamily.serif],
    //     mono: ['ui-monospace', 'SFMono-Regular', ...defaultTheme.fontFamily.mono],
    //   },
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
