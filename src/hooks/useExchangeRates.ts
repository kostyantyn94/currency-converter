import { useEffect } from "react";
import { fetchExchangeRates } from "@/utils/currency";
import { Dispatch } from "react";

type CurrencyAction = { type: "SET_RATES"; payload: Record<string, number> }

export const useExchangeRates = (baseCurrency: string, dispatch: Dispatch<CurrencyAction>) => {
    useEffect(() => {
            const loadRates = async () => {
                const newRates = await fetchExchangeRates(baseCurrency);
                dispatch({ type: "SET_RATES", payload: newRates });
            };
            loadRates();

    }, [baseCurrency, dispatch]);
};
