import withMT from "@material-tailwind/react/utils/withMT";

const withTailwind = withMT({
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
});

export default withTailwind;
