import { useEffect } from "react";

export const useConversionHistory = (dispatch: React.Dispatch<any>) => {
    useEffect(() => {
        const storedHistory = localStorage.getItem("conversionHistory");
        if (storedHistory) {
            dispatch({ type: "SET_RATES", payload: JSON.parse(storedHistory) });
        }
    }, []);
};
