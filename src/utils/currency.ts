import {State} from "@/reducers/currencyReducer";
import { Dispatch } from "react";

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY
const API_URL = process.env.NEXT_PUBLIC_API_URL
const FULL_API_URL = `${API_URL}/${API_KEY}/latest/`

type CurrencyAction = { type: "SET_CONVERSION_RESULT"; payload: number | null } | { type: "ADD_TO_HISTORY"; payload: { base: string; target: string; amount: number; result: number } }

export const fetchExchangeRates = async (baseCurrency: string) => {
    try {
        const response = await fetch(`${FULL_API_URL}${baseCurrency}`, {
            cache: "no-store",
        })
        const data = await response.json()
        return data.conversion_rates || {}
    } catch (error) {
        console.error("Error fetching rates:", error)
        return {}
    }
}

export const popularCurrencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"]
export const exoticCurrencies = ["VES", "IRR", "LBP", "MGA", "LAK", "UZS"]

export const filterRates = (rates: Record<string, number>, baseCurrency: string, filter: string, search: string) => {
    return Object.entries(rates)
        .filter(([currency]) => currency !== baseCurrency)
        .filter(([currency]) => {
            if (filter === "popular") return popularCurrencies.includes(currency)
            if (filter === "exotic") return exoticCurrencies.includes(currency)
            return true
        })
        .filter(([currency]) => currency.includes(search.toUpperCase()))
}

export const sortRates = (rates: [string, number][], sortType: string) => {
    return [...rates].sort((a, b) => {
        if (sortType === "asc") return a[0].localeCompare(b[0])
        if (sortType === "desc") return b[0].localeCompare(a[0])
        if (sortType === "value-asc") return a[1] - b[1]
        if (sortType === "value-desc") return b[1] - a[1]
        return 0
    })
}

export const convertCurrency = (state: State, dispatch: Dispatch<CurrencyAction>) => {
    if (!state.rates[state.targetCurrency] || !state.amount) return;

    const result = state.amount * state.rates[state.targetCurrency];

    dispatch({ type: "SET_CONVERSION_RESULT", payload: result });
    dispatch({
        type: "ADD_TO_HISTORY",
        payload: { base: state.baseCurrency, target: state.targetCurrency, amount: state.amount, result },
    });
};
