import { useContext } from 'react';

import classNames from 'classnames';

import { WeatherAppContext } from '../WeatherApp';
import { WeatherIcon } from '../WeatherIcon/WeatherIcon';
import { SimpleLoader } from '../SimpleLoader';
import { SimpleError } from '../SimpleError';

import { useLoading } from '../../hooks/useLoading';
import { mapDailyForecast } from '../../utils/mapDailyForecast';
import { useApi } from '../../services/api';

import { DAILY_OFFLINE_DATAKEY } from './Daily.const';

import styles from './Daily.module.css';

export const Daily = (): React.JSX.Element => {
    const { fetchDaily } = useApi();
    const {
        isLocationLoading,
        isLocationError,
    } = useContext(WeatherAppContext);
    const {
        isLoading,
        isError,
        data,
    } = useLoading({
        callback: fetchDaily,
        offlineDataKey: DAILY_OFFLINE_DATAKEY,
    });

    const { dailyForecast, weeklyRange } = mapDailyForecast(data?.DailyForecasts);

    const shouldShowLoader = isLoading || isLocationLoading;
    const shouldShowError = !shouldShowLoader && (isError || isLocationError);

    return (
        <div className={classNames(styles.daily, 'glass')}>
            <div className={styles['daily-title-wrapper']}>
                <div className={styles['daily-title']}>10-DAY FORECAST</div>
                {shouldShowLoader && <SimpleLoader size={14} />}
                {shouldShowError && <SimpleError size={14} />}
            </div>
            <div className={styles['daily-list']}>
                {dailyForecast.map(
                    ({ dayName, temp, icon }, idx: number) => {
                        const left = 100 - Math.floor((weeklyRange[0] / temp[0]) * 100);
                        const right = 100 - Math.floor((temp[1] / weeklyRange[1]) * 100);
                        const iconType = Math.floor(icon % 5);

                        return (
                            <div className={styles['daily-row']} key={idx}>
                                <div className={styles['daily-time']}>{dayName}</div>

                                <div className={styles['daily-conditions']}>
                                    <WeatherIcon type={iconType} />
                                </div>

                                <div className={styles['daily-range']}>
                                    <span className={styles['daily-min']}>{temp[0]}°</span>
                                    <span className={styles.range}>
                                        <span className={styles['range-meter']} style={{ "--left": `${left}%`, '--right': `${right}%` } as React.CSSProperties} />
                                        <span className={styles['range-current']} />
                                    </span>
                                    <span className={styles['daily-max']}>{temp[1]}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
        </div>
    );
}
