// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#D1514A',
        'primary-nuance': '#FCF4F4',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}


export default createVuetify({
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: { myCustomLightTheme }
    },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
