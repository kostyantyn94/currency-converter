export interface State {
    baseCurrency: string;
    targetCurrency: string;
    amount: number;
    inputAmount: string;
    conversionResult: number | null;
    rates: Record<string, number>;
    currencies: string[];
    history: { base: string; target: string; amount: number; result: number }[];
}

export const initialState: State = {
    baseCurrency: "USD",
    targetCurrency: "EUR",
    amount: 1,
    inputAmount: "1",
    conversionResult: null,
    rates: {},
    currencies: [],
    history: [],
};

type Action =
    | { type: "SET_BASE_CURRENCY"; payload: string }
    | { type: "SET_TARGET_CURRENCY"; payload: string }
    | { type: "SET_AMOUNT"; payload: string }
    | { type: "SET_CONVERSION_RESULT"; payload: number | null }
    | { type: "SET_RATES"; payload: Record<string, number> }
    | { type: "SWAP_CURRENCIES" }
    | { type: "ADD_TO_HISTORY"; payload: { base: string; target: string; amount: number; result: number } }
    | { type: "CLEAR_HISTORY" };

export const currencyReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_BASE_CURRENCY":
            return { ...state, baseCurrency: action.payload, conversionResult: null };
        case "SET_TARGET_CURRENCY":
            return { ...state, targetCurrency: action.payload, conversionResult: null };
        case "SET_AMOUNT":
            return { ...state, inputAmount: action.payload, amount: parseFloat(action.payload) || 1 };
        case "SET_CONVERSION_RESULT":
            return { ...state, conversionResult: action.payload };
        case "SET_RATES":
            const newCurrencies = Object.keys(action.payload).filter(key => isNaN(Number(key)));
            return {
                ...state,
                rates: action.payload,
                currencies: newCurrencies.length > 0 ? newCurrencies : state.currencies,
            };
        case "SWAP_CURRENCIES":
            return {
                ...state,
                baseCurrency: state.targetCurrency,
                targetCurrency: state.baseCurrency,
                conversionResult: null,
            };
        case "ADD_TO_HISTORY":
            const newHistory = [...state.history, action.payload];
            localStorage.setItem("conversionHistory", JSON.stringify(newHistory));
            return { ...state, history: newHistory };
        case "CLEAR_HISTORY":
            localStorage.removeItem("conversionHistory");
            return { ...state, history: [] };
        default:
            return state;
    }
};
