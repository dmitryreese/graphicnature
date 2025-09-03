import { useContext } from 'react';

import classNames from 'classnames';

import { mapHourlyForecast, type IHourlyRawData } from '../../utils/mapHourlyForecast';

import { useLoading } from '../../hooks/useLoading';
import { WeatherAppContext } from '../WeatherApp';
import { useApi } from '../../services/api';

import { SimpleLoader } from '../SimpleLoader';
import { SimpleError } from '../SimpleError';
import { WeatherIcon } from '../WeatherIcon/WeatherIcon';

import { HOURLY_OFFLINE_DATAKEY } from './Hourly.const';

import styles from './Hourly.module.css';

export const Hourly = (): React.JSX.Element => {
    const { fetchHourly } = useApi();
    const {
        isLocationLoading,
        isLocationError,
    } = useContext(WeatherAppContext);
    const {
        isLoading,
        isError,
        data,
    } = useLoading({
        callback: fetchHourly,
        offlineDataKey: HOURLY_OFFLINE_DATAKEY,
    });

    const { hourlyForecast } = mapHourlyForecast(data as IHourlyRawData[]) ?? {};

    const shouldShowLoader = isLoading || isLocationLoading;
    const shouldShowError = !shouldShowLoader && (isError || isLocationError);

    return (
        <div className={classNames(styles.hourly, 'glass')}>
            <div className={styles['hourly-title-wrapper']}>
                <div className={styles['hourly-title']}>HOURLY FORECAST</div>
                {shouldShowLoader && <SimpleLoader size={14} />}
                {shouldShowError && <SimpleError size={14} />}
            </div>
            <div className={styles.scroller}>
                <div className={styles['hourly-list']}>
                    {hourlyForecast.map(({ time, temp, icon }, idx) => {
                        const iconType = Math.floor(icon.length % 5);

                        return (
                            <div className={styles['hourly-item']} key={idx}>
                                <span>{time}</span>
                                <span>
                                    <WeatherIcon type={iconType} />
                                </span>
                                <span>{temp}°</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
