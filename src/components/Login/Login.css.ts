import {createTheme, style, styleVariants, globalStyle,keyframes} from '@vanilla-extract/css';


export const row = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});


export const textbox = style({
    fontSize: '32px',
    padding: '2px',
    width: '64px',
    textAlign: 'center',
    marginRight: '4px'
});
