import classNames from 'classnames';

import type { SimpleErrorProps } from './SimpleError.types';

import styles from './SimpleError.module.css';

export const SimpleError = ({ className, size }: SimpleErrorProps): React.JSX.Element => {
    return (
        <span
            className={classNames(className, styles.error)}
            style={{ width: `${size}px`, height: `${size}px`}}
        />
    );
}
