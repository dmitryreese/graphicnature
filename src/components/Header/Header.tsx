import { useContext } from 'react';

import { SimpleLoader } from '../SimpleLoader';
import { SimpleError } from '../SimpleError';
import { WeatherAppContext } from '../WeatherApp';

import styles from './Header.module.css';

export const Header = (): React.JSX.Element => {
    const {
        location,
        isLocationLoading,
        isLocationError,
        currentWeather,
    } = useContext(WeatherAppContext);

    const {
        currentTemp,
        description,
        highestTemp,
        lowestTemp,
    } = currentWeather ?? {};

    const shouldShowLoader =  isLocationLoading;
    const shouldShowError = isLocationError;

    return (
        <div className={styles.header}>
            <div className={styles['header-location-wrapper']}>
                <span className={styles.location}>{location?.EnglishName}</span>
                {shouldShowLoader && <SimpleLoader className={styles.loader} />}
                {shouldShowError && <SimpleError className={styles.error} />}
            </div>
            {currentTemp && (
                <>
                    <span className={styles.temp}>{currentTemp}°</span>
                    <div className={styles.conditions}>
                        <span>{description}</span>
                        <span>L:{lowestTemp}° H:{highestTemp}°</span>
                    </div>
                </>
            )}
        </div>
    );
}
