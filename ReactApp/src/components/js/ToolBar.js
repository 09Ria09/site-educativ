import React from 'react';
import { css, cx } from '@emotion/css';

const Menu = React.forwardRef
(
    ({ className, ...props }, ref) =>
    (
        <div {...props} ref={ref} className={cx(className, css`> * {display: inline-block;margin-left: 15px;}`)}/>
    )
);

const Toolbar = React.forwardRef
(
    ({ className, ...props }, ref) =>
    (
        <Menu {...props} ref={ref} className={cx(className, css`position: relative; padding: 1px 18px 17px; margin: 0 -20px; border-bottom: 2px solid #eee; margin-bottom: 20px;`)}/>
    )
);

export default Toolbar;