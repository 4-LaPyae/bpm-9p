import colors from "./color";

const { info, dark } = colors;

const globals = {
    html: {
        scrollBehavior: "smooth",
        backgroundColor: "rgb(248, 249, 250)",
    },
    "*, *::before, *::after": {
        margin: 0,
        padding: 0,
    },
    "a, a:link, a:visited": {
        textDecoration: "none !important",
    },
    "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
        color: `${dark.main} !important`,
        transition: "color 150ms ease-in !important",
    },
    "a.link:hover, .link:hover, a.link:focus, .link:focus": {
        color: `${info.main} !important`,
    },
    /* 
    Customize website's scrollbar like Mac OS
    Not supports in Firefox and IE */

    /* total width */
    "body::-webkit-scrollbar": {
        backgroundColor: "#fff",
        width: "16px",
    },

    /* background of the scrollbar except button or resizer */
    "body::-webkit-scrollbar-track": {
        backgroundColor: "#fff",
    },

    /* scrollbar itself */
    "body::-webkit-scrollbar-thumb": {
        backgroundColor: "#babac0",
        borderRadius: "16px",
        border: "4px solid #fff",
    },

    /* set button(top and bottom of the scrollbar) */
    "body::-webkit-scrollbar-button": {
        display: "none",
    },
};

export default globals;
