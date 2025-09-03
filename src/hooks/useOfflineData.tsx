import { useCallback } from "react";

export const useOfflineData = () => {
    const setOfflineData = useCallback((dataKey: string, data: any) => {
        localStorage.setItem(dataKey, JSON.stringify(data));
    }, []);

    const getOfflineData = useCallback((dataKey: string) => {
        try {
            const offlineData = localStorage.getItem(dataKey);
            
            return offlineData && JSON.parse(offlineData);
        } catch (err) {}
    }, []);

    return {
        getOfflineData,
        setOfflineData,
    };
};
