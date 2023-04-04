module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["vazirmatn"],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}