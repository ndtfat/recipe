'use client';

import { useRef } from 'react';

function Button({ typeBtn = 'default', type = 'button', className = '', disable, children, ...props }) {
    const classes = useRef({
        default: 'bg-black hover:bg-primary text-white',
        primary: 'bg-primary outline-2 text-white hover:bg-white hover:outline-primary hover:text-primary',
        outline: 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white',
    });

    return (
        <button
            {...props}
            type={type}
            className={
                'inline-block outline-none duration-300 cursor-pointer' +
                (disable ? ' bg-[#d9d9d9] pointer-events-none ' : ' ') +
                className +
                ' ' +
                classes.current[typeBtn]
            }
        >
            {children}
        </button>
    );
}

export default Button;
