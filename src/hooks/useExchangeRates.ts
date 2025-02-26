import { useEffect } from "react";
import { fetchExchangeRates } from "@/utils/currency";

export const useExchangeRates = (baseCurrency: string, dispatch: React.Dispatch<any>) => {
    useEffect(() => {
        if (baseCurrency !== "USD") {
            const loadRates = async () => {
                const newRates = await fetchExchangeRates(baseCurrency);
                dispatch({ type: "SET_RATES", payload: newRates });
            };
            loadRates();
        }
    }, [baseCurrency, dispatch]);
};
