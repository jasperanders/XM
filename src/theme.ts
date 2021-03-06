// example base theme from @theme-ui/presets

const primaryBorder = "2px solid #07c";

export default {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [15, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
    secondary: "#30c",
    muted: "#f6f6f6",
    light: " #E8F4FF",
    inactive: "#AFC5CB",
    active: "#e74c3c",
    warning: "#e74c3c",
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    warning: {
      color: "active",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      fontSize: 0,
    },
    h1: {
      variant: "text.heading",
      fontSize: 5,
    },
    h2: {
      variant: "text.heading",
      fontSize: 4,
    },
    h3: {
      variant: "text.heading",
      fontSize: 3,
    },
    h4: {
      variant: "text.heading",
      fontSize: 2,
    },
    h5: {
      variant: "text.heading",
      fontSize: 1,
    },
    h6: {
      variant: "text.heading",
      fontSize: 0,
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      padding: "0.5rem",
      textAlign: "left",
      borderBottomStyle: "1px solid black",
    },
    tr: {
      odd: {},
      ":hover": { backgroundColor: "#ddd" },
    },
    progress: {
      color: "primary",
      height: "0.75rem",
    },
  },
  layout: {
    container: {
      padding: "1rem",
    },
    masterContainer: {
      margin: "auto",
      marginTop: "0.5rem",
      width: ["100%", "100%", "90%"],
      paddingLeft: "3rem",
      paddingRight: "3rem",
    },
    header: {},
  },
  cards: {
    primary: {
      backgroundColor: "muted",
      padding: "2rem",
      borderRadius: 4,
      boxShadow:
        "0 1px 1px 0 rgba(66, 66, 66, 0.08), 0 1px 3px 1px rgba(66, 66, 66, 0.16)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
    blueBorder: {
      padding: "1rem",
      border: primaryBorder,
      borderRadius: 2,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  forms: {
    textarea: {
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
      minWidth: "100px",
      minHeight: "100px",
      ":focus": {
        border: "1px solid #07c",
        backgroundColor: "light",
      },
    },
  },
  buttons: {
    primary: {
      cursor: "pointer",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    warning: {
      backgroundColor: "warning",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    activeTab: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    mutedTab: {
      backgroundColor: "inactive",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    tiny: {
      backgroundColor: "secondary",
    },
  },
};
