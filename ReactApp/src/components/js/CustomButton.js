import React from 'react';
import {css, cx} from '@emotion/css'

const Button = React.forwardRef
(
    ({className, active, ...props}, ref) =>
        (
            <span {...props} ref={ref}
                  className={cx(className, css`cursor: pointer;
                          color: ${active ? 'black' : '#ccc'};`)}/>
        )
);

export default Button;