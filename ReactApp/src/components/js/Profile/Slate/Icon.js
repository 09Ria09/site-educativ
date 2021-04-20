import React from 'react';
import '../../../css/Profile/TextBox.css';

const Icon = React.forwardRef
(
    ({className, ...props}, ref) =>
        (
            <span {...props} ref={ref}
                  className={'material-icons TextBoxIcon ' + (className !== undefined ? className : '')}/>
        )
)

export default Icon;