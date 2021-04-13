import React from 'react';
import { css, cx } from '@emotion/css';

const Icon = React.forwardRef
    (
        ({ className, ...props }, ref) =>
        (
            <span {...props} ref={ref} className={cx('material-icons', className, css`font-size: 18px; vertical-align: text-bottom;`)}/>
        )
    )

export default Icon;