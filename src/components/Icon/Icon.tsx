import classNames from 'classnames';

export const Icon = ({
    icon, className,
}: {
    icon: string;
    className?: string;
}): React.JSX.Element => {
    return (
        <img
            className={classNames(className)}
            alt="icon"
            src={icon}
        />
    );
}
