import classNames from 'classnames';

import type { SimpleLoaderProps } from './SimpleLoader.types';

import styles from './SimpleLoader.module.css';

export const SimpleLoader = ({ className, size }: SimpleLoaderProps): React.JSX.Element => {
    return (
        <span
            className={classNames(className, styles.loader)}
            style={{ width: `${size}px`, height: `${size}px`}}
        />
    );
}
