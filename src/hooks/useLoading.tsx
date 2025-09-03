import { useCallback, useEffect, useState } from "react";

import { useOfflineData } from './useOfflineData';

export interface UseLoadingProps {
    callback: any;
    offlineDataKey?: string;
}

export const useLoading = ({
    callback,
    offlineDataKey,
}: UseLoadingProps) => {
    const { getOfflineData, setOfflineData } = useOfflineData();
    const offlineData = offlineDataKey && getOfflineData(offlineDataKey);

    const [isLoading, setIsLoadingState] = useState(false);
    const [isError, setIsErrorState] = useState(false);
    const [loadedData, setLoadedData] = useState(offlineData);

    const setIsLoading = useCallback((isLoading: boolean) => {
        setIsLoadingState(isLoading);
    }, []);

    const setIsError = useCallback((isError: boolean) => {
        setIsErrorState(isError);
    }, []);

    const load = useCallback(async () => {
        try {
            setIsErrorState(false);
            setIsLoadingState(true);

            const data = await callback();

            if (offlineDataKey && data !== undefined) {
                setOfflineData(offlineDataKey, data);
            }
            
            if (data !== undefined) {
                setLoadedData(data);
            }

            return data;
        } catch (err) {
            setIsErrorState(true);
        } finally {
            setIsLoadingState(false);
        }
    }, [callback]);

    useEffect(() => {
        load();
    }, [callback]);

    return {
        isLoading,
        isError,
        data: loadedData,
        load,
        setIsLoading,
        setIsError,
    };
};
