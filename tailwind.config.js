/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx", "./src/**/**/*.tsx"],
	theme: {
		extend: {
			boxShadow: {
				lift:"0px 5px 10px 0px rgba(0,0,0,0.5)"
			}
		},
	},
	plugins: [],
};
