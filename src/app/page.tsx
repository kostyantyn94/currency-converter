"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const FULL_API_URL = `${API_URL}/${API_KEY}/latest/`;

export default function Home() {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [targetCurrency, setTargetCurrency] = useState("EUR");
    const [amount, setAmount] = useState(1);
    const [inputAmount, setInputAmount] = useState("1");
    const [conversionResult, setConversionResult] = useState<number | null>(null);
    const [rates, setRates] = useState<Record<string, number>>({});
    const [history, setHistory] = useState<{ base: string; target: string; amount: number; result: number }[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios.get(`${FULL_API_URL}${baseCurrency}`)
            .then(response => {
                if (response.data.conversion_rates) {
                    setRates(response.data.conversion_rates);
                    setCurrencies(Object.keys(response.data.conversion_rates));
                }
            })
            .catch(error => console.error("Error fetching rates:", error));
    }, [baseCurrency]);

    useEffect(() => {
        const storedHistory = localStorage.getItem("conversionHistory");
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    const convertCurrency = () => {
        const numAmount = parseFloat(inputAmount);
        if (rates[targetCurrency] && !isNaN(numAmount) && numAmount > 0) {
            const result = numAmount * rates[targetCurrency];
            setAmount(numAmount);
            setConversionResult(result);

            const newEntry = { base: baseCurrency, target: targetCurrency, amount: numAmount, result };
            const updatedHistory = [newEntry, ...history].slice(0, 5);
            setHistory(updatedHistory);
            localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
        }
    };

    const swapCurrencies = () => {
        const newBaseCurrency = targetCurrency;
        const newTargetCurrency = baseCurrency;
        const newAmount = conversionResult !== null ? conversionResult.toFixed(2) : inputAmount;

        setBaseCurrency(newBaseCurrency);
        setTargetCurrency(newTargetCurrency);
        setInputAmount(newAmount);
        setAmount(parseFloat(newAmount));
        setConversionResult(null);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("conversionHistory");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg text-center">
                <Head>
                    <title>Currency Converter</title>
                </Head>

                <h1 className="text-3xl font-bold mb-6 text-gray-800">💱 Currency Converter</h1>

                <div className="flex flex-col gap-6">
                    {/* Поле ввода */}
                    <div className="flex flex-col bg-gray-50 p-4 rounded-lg border">
                        <label className="text-lg font-semibold text-left text-gray-700">Amount:</label>
                        <input
                            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            value={inputAmount}
                            onChange={(e) => setInputAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="flex flex-col bg-gray-50 p-4 rounded-lg border">
                        <label className="text-lg font-semibold text-left text-gray-700">From Currency:</label>
                        <select
                            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={baseCurrency}
                            onChange={(e) => setBaseCurrency(e.target.value)}
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="bg-gray-600 text-white px-4 py-3 rounded-lg shadow-sm hover:bg-gray-700 transition flex items-center justify-center gap-2"
                        onClick={swapCurrencies}
                    >
                        🔄 Swap Currencies
                    </button>

                    <div className="flex flex-col bg-gray-50 p-4 rounded-lg border">
                        <label className="text-lg font-semibold text-left text-gray-700">To Currency:</label>
                        <select
                            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={targetCurrency}
                            onChange={(e) => setTargetCurrency(e.target.value)}
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
                            onClick={convertCurrency}
                        >
                            🔍 Convert
                        </button>
                        <button
                            className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition"
                            onClick={() => router.push("/exchange-rates")}
                        >
                            📊 View Rates
                        </button>
                    </div>

                    {conversionResult !== null && (
                        <div className="mt-6 p-4 bg-gray-100 text-gray-800 rounded-lg shadow-sm text-lg font-bold">
                            {amount} {baseCurrency} = {conversionResult.toFixed(2)} {targetCurrency}
                        </div>
                    )}

                    {history.length > 0 && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-3 text-gray-700">🕘 Recent Conversions</h2>
                            <ul className="text-left text-gray-800">
                                {history.map((entry, index) => (
                                    <li key={index} className="py-1 border-b last:border-none">
                                        {entry.amount} {entry.base} → {entry.result.toFixed(2)} {entry.target}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-700 transition"
                                onClick={clearHistory}
                            >
                                ❌ Clear History
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
