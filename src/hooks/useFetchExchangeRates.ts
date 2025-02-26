import { useEffect, useState } from "react";
import { fetchExchangeRates } from "@/utils/currency";

export const useFetchExchangeRates = (initialRates: Record<string, number>) => {
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [rates, setRates] = useState(initialRates);

    useEffect(() => {
            const loadRates = async () => {
                const newRates = await fetchExchangeRates(baseCurrency);
                setRates(newRates);
            };
            loadRates();

    }, [baseCurrency]);

    return { baseCurrency, setBaseCurrency, rates };
};
