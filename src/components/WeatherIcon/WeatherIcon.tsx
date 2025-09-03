import NightCloudy from '../../icons/NightCloudy.svg';
import LightRain from '../../icons/LightRain.svg';
import HeavyRain from '../../icons/HeavyRain.svg';
import Rain from '../../icons/Rain.svg';
import Thunder from '../../icons/Thunder.svg';

import { Icon } from '../Icon';

import styles from './WeatherIcon.module.css';

const ICONS = [NightCloudy, LightRain, HeavyRain, Rain, Thunder];

export const WeatherIcon = ({ type }: { type: number }): React.JSX.Element => {
    const icon = ICONS[type];

    return (
        <div className={styles['weather-icon']}>
            <Icon icon={icon} />
        </div>
    );
};
