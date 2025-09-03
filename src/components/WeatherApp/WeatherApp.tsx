import { useContext, useEffect, useMemo } from 'react';

import classNames from 'classnames';

import { Hourly } from '../Hourly';
import { Daily } from '../Daily';
import { Header } from '../Header';
import { SimpleError } from '../SimpleError';
import { SimpleLoader } from '../SimpleLoader';

import { useApi } from '../../services/api';
import { getBackgroundGradient } from '../../utils/getBackgroundGradient';

import { WeatherAppContext } from '.';

import styles from './WeatherApp.module.css';

export const WeatherApp = (): React.JSX.Element => {
    const gradient = getBackgroundGradient();
    const { fetchLocation } = useApi();
    const {
        location,
        isLocationLoading,
        isLocationError,
        isGeoEnabled,
        setIsGeoEnabled,
    } = useContext(WeatherAppContext);

    const content = useMemo(() => {
        if (isLocationLoading && (location === undefined || location === null)) {
            return (
                <div className={styles['init-container']}>
                    <SimpleLoader size={60} />
                    <span className={styles['init-text']}>Initializing</span>
                </div>
            );
        } else if (isLocationError && (location === undefined || location === null)) {
            return (
                <div className={styles['init-container']}>
                    <SimpleError size={60} />
                    <span className={styles['init-text']}>Error While Initializing</span>
                </div>
            );
        } else if (!isGeoEnabled) {
            return (
                <div className={styles['init-container']}>
                    <SimpleError size={60} />
                    <span className={styles['init-text']}>Geolocation Unavailable</span>
                </div>
            );
        } else {
            return (
                <>
                    <Header />
                    <Hourly />
                    <Daily />
                </>
            );
        }
    }, [isLocationLoading, isLocationError]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude: lat, longitude: lon } = pos.coords;

            setIsGeoEnabled(true);
            fetchLocation(lat, lon);
        });
    }, [fetchLocation]);

    return (
        <div className={classNames(gradient, styles.main)}>
            <div className={styles.wrapper}>
                {content}
            </div>
        </div>
    );
}
