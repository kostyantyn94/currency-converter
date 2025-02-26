"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { CurrencyInput } from "./currency-input";
import { CurrencySelector } from "./currency-selector";
import { ConversionHistory } from "./conversion-history";
import { currencyReducer } from "@/reducers/currencyReducer";
import {initialState} from "@/reducers/currencyReducer";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { convertCurrency } from "@/utils/currency";

interface CurrencyConverterClientProps {
    initialRates: Record<string, number>;
    initialCurrencies: string[];
}

export default function CurrencyConverterClient({ initialRates, initialCurrencies }: CurrencyConverterClientProps) {
    const [state, dispatch] = useReducer(currencyReducer, {
        ...initialState,
        rates: initialRates,
        currencies: initialCurrencies,
    });

    const router = useRouter();

    useConversionHistory(dispatch);
    useExchangeRates(state.baseCurrency, dispatch);

    return (
        <div className="space-y-4">
            <CurrencyInput
                label="Amount"
                value={state.inputAmount}
                onChange={(value) => dispatch({ type: "SET_AMOUNT", payload: value })}
                placeholder="Enter amount"
            />

            <CurrencySelector
                label="From Currency"
                value={state.baseCurrency}
                currencies={state.currencies}
                onChange={(value) => dispatch({ type: "SET_BASE_CURRENCY", payload: value })}
            />

            <Button
                className="w-full bg-gray-600 text-white py-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                onClick={() => dispatch({ type: "SWAP_CURRENCIES" })}
            >
                🔄 Swap Currencies
            </Button>

            <CurrencySelector
                label="To Currency"
                value={state.targetCurrency}
                currencies={state.currencies}
                onChange={(value) => dispatch({ type: "SET_TARGET_CURRENCY", payload: value })}
            />

            <div className="flex gap-3 mt-6">
                <Button
                    className="flex-1 bg-blue-500 text-white py-3 rounded-lg shadow-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    onClick={() => convertCurrency(state, dispatch)}
                >
                    <span className="text-lg">🔄</span> Convert
                </Button>
                <Button
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    onClick={() => router.push("/exchange-rates")}
                >
                    📊 View Rates
                </Button>
            </div>

            {state.conversionResult !== null && (
                <div className="mt-6 p-4 bg-blue-50 text-blue-900 rounded-lg text-center">
                    <div className="text-sm text-blue-600 mb-1">Result</div>
                    <div className="text-xl font-semibold">
                        {state.amount} {state.baseCurrency} = {state.conversionResult.toFixed(2)} {state.targetCurrency}
                    </div>
                </div>
            )}

            <ConversionHistory history={state.history} onClear={() => dispatch({ type: "CLEAR_HISTORY" })} />
        </div>
    );
}
