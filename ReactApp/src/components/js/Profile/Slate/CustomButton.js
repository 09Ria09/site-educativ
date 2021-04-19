import React from 'react';
import '../../../css/Profile/TextBox.css';

const Button = React.forwardRef
(
    ({className, active, ...props}, ref) =>
        (
            <span {...props} ref={ref}
                  className={(className !== undefined ? className : '') + ' customButton' + (active === true ? ' customButtonActive' : '')}/>
        )
);

export default Button;