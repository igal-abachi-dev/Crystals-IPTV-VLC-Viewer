import {createTheme, style, styleVariants, globalStyle,keyframes} from '@vanilla-extract/css';

export const [counterTheme, vars] = createTheme({
    color: {
        color: 'rgb(112, 76, 182)',
        button: 'rgba(112, 76, 182, 0.1)',
        hoverBorder: 'rgba(112, 76, 182, 0.4)',
        click: 'rgba(112, 76, 182, 0.2)',
        asyncAfter: 'rgba(112, 76, 182,  0.15)',
    },
    font: {
        value: "'Courier New', Courier, monospace"
    }
});

export const button = style({
    appearance: 'none',
    background: 'none',
    outline: 'none',
    fontSize: '32px',
    paddingLeft: '12px',
    paddingRight: '12px',
    cursor: 'pointer',
    backgroundColor: vars.color.button,
    color: vars.color.color,
    border: '2px solid transparent',
    borderRadius: '2px',
    paddingBottom: '4px',
    transition: 'all 0.15s',
    ':hover': {
        border: '2px solid '+vars.color.hoverBorder
    },
    ':focus': {
        border: '2px solid '+vars.color.hoverBorder
    },
    ':active': {
        backgroundColor: vars.color.click
    }

});

export const asyncButton = style([
    button,
    {
        position: 'relative',
        ':after': {
            content:'',
            backgroundColor:vars.color.asyncAfter,
            display:'block',
            position:'absolute',
            width:'100%',
            height:'100%',
            left:'0',
            top:'0',
            opacity:'0',
            transition:'width 1s linear, opacity 0.5s ease 1s',
        },
        ':active': {
            width:'0%',
            opacity:'1',
            transition:'0s',
        }
    }
]);

export const row = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

//
// export const rowChild = style({
//     selectors: {
//         [`${row} > ${button}`]: {
//             marginLeft: '4px',
//             marginRight: '8px',
//         },
//         [`${row}:not(:last-child)`]: {
//             marginBottom: '16px',
//         }
//     }
// });

export const value = style({
    fontFamily: vars.font.value,
    fontSize: '78px',
    paddingLeft: '16px',
    paddingRight: '16px',
    marginTop: '2px'

});

export const textbox = style({
    fontSize: '32px',
    padding: '2px',
    width: '64px',
    textAlign: 'center',
    marginRight: '4px'
});
