  // Color design tokens
  export const tokensDark = {
    grey: {
      0: "#ffffff", // manually adjusted
      10: "#f6f6f6", // manually adjusted
      50: "#f0f0f0", // manually adjusted
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
      1000: "#000000", // manually adjusted
    },
    primary: {  // Modified primary object
      100: "#808080",
      200: "#6A6A6A",
      300: "#555555",
      400: "#FFFFFF",
      500: "#2B2B2B",
      600: "#1d1d1d",
      700: "#010101",
      800: "#161616",
      900: "#000000", 
    },
    secondary: {
      // dark red
      50: "#ce0000",
      100: "#ce0000",
      200: "#ce0000",
      300: "#ce0000",
      400: "#ce0000",
      500: "#ce0000",
      600: "#ce0000",
      700: "#ce0000",
      800: "#ce0000",
      900: "#ce0000",
      1000: "#FFFFFF",
    },
  };

  // Function that reverses the color palette and replaces specified colors
  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        // Replace blue with #D9D9D9
        if (values[length - i - 1] === "#D9D9D9") {
          reversedObj[keys[i]] = "#D9D9D9";
        } else {
          reversedObj[keys[i]] = values[length - i - 1];
        }
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }

  export const tokensLight = reverseTokens(tokensDark);

  // MUI theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[500], // Lighter shade of black
                light: tokensDark.primary[600], 
              },
              secondary: {
                ...tokensDark.secondary,
                main: tokensDark.secondary[500],
              },
              neutral: {
                ...tokensDark.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.primary[800], 
                alt: tokensDark.primary[600], // Lighter shade of black
              },
            }
          : {
              // palette values for light mode
              primary: {
                ...tokensLight.primary,
                main: tokensDark.grey[0], 
                light: tokensDark.grey[100], 
              },
              secondary: {
                ...tokensLight.secondary,
                main: tokensDark.secondary[500], 
                light: tokensDark.secondary[600],
              },
              neutral: {
                ...tokensLight.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.grey[100], 
                alt: tokensDark.grey[50], 
              },
            }),
      },
      typography: {
        fontFamily: ["Koulen", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Koulen", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Koulen", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Koulen", "sans-serif"].join(","), 
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Koulen", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Koulen", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Koulen", "sans-serif"].join(","), 
          fontSize: 14,
        },
      },
      // Add hover effect styles
      components: {
        MuiButtonBase: {
          styleOverrides: {
            root: {
              "&:hover": {
                backgroundColor: "white", // Change hover background to white
              },
            },
          },
        },
      },
    };
  };