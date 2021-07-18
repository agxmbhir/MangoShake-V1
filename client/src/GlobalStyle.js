import { createGlobalStyle } from 'styled-components';

export const GlobalStyle  = createGlobalStyle`


:root {
    --primary-color:white;
    --secondary-color: whiteSmoke;
    --hover-theme: ;
    --font:  'Montserrat', sans-serif;
}
* {
    font-family: var(--font);
    
}
body {
    background-color: whitesmoke;
    grid-template-areas:
     'header header header header header header'
     'main main main main right right'
     'text text text text text text';
     grid-gap: 10px;
}
`