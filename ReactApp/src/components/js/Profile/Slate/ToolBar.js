import React from 'react';

const Menu = React.forwardRef
(
    ({className, ...props}, ref) =>
        (
            <div {...props} ref={ref} className={(className !== undefined ? className : '') + ' ToolBar1'}/>
        )
);

const Toolbar = React.forwardRef
(
    ({className, ...props}, ref) =>
        (
            <Menu {...props} ref={ref}
                  className={(className !== undefined ? className : '') + ' ToolBar2'}/>
        )
);

export default Toolbar;