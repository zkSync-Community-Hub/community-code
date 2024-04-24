import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
        serif: ['Montserrat', ...defaultTheme.fontFamily.serif],
        mono: ['Fira Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        zkSlate: {
          50: '#f6f6f9',
          100: '#ebebf3',
          200: '#d3d4e4',
          300: '#adafcc',
          400: '#8084b0',
          500: '#606597',
          600: '#4c4f7d',
          700: '#3e4066',
          800: '#363856',
          900: '#313249',
          950: '#0a0a0f',
        },
        zkPurple: {
          50: '#edefff',
          100: '#dee2ff',
          200: '#c4caff',
          300: '#a0a7ff',
          400: '#8c8aff',
          500: '#695bf9',
          600: '#5a3dee',
          700: '#4e2fd3',
          800: '#3f29aa',
          900: '#362986',
          950: '#22184e',
        },
        zkBlue: {
          50: '#edf6ff',
          100: '#d7eaff',
          200: '#b9dbff',
          300: '#88c6ff',
          400: '#50a7ff',
          500: '#2881ff',
          600: '#1e69ff',
          700: '#0a4aeb',
          800: '#0f3cbe',
          900: '#133895',
          950: '#11235a',
        },
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16',
        },
      },
    },
  }
}
