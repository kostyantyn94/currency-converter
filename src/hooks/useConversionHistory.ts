import { useEffect } from "react";
import { Dispatch } from "react";

type CurrencyAction =
    | { type: "INIT_HISTORY"; payload: { base: string; target: string; amount: number; result: number }[] };

export const useConversionHistory = (dispatch: Dispatch<CurrencyAction>) => {
    useEffect(() => {
        const storedHistory = localStorage.getItem("conversionHistory");
        if (storedHistory) {
            dispatch({ type: "INIT_HISTORY", payload: JSON.parse(storedHistory) });
        }
    }, [dispatch]);
};