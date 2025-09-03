import styles from './getBackgroundGradient.module.css';

export const getBackgroundGradient = () => {
    const currentTime = new Date().getHours();

    return (
        (currentTime >= 5 && currentTime < 11 && styles.morning)
        || (currentTime >= 11 && currentTime < 17 && styles.day)
        || (currentTime >= 17 && currentTime < 21 && styles.evening)
        || styles.night
    );
}
