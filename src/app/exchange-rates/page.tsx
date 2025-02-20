"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const FULL_API_URL = `${API_URL}/${API_KEY}/latest/`;

export default function ExchangeRates() {
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [rates, setRates] = useState<Record<string, number>>({});
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all"); // Фильтр: all, popular, exotic
    const [sort, setSort] = useState("default"); // Сортировка: default, asc, desc, value-asc, value-desc
    const router = useRouter();

    useEffect(() => {
        axios.get(`${FULL_API_URL}${baseCurrency}`)
            .then(response => {
                if (response.data.conversion_rates) {
                    setRates(response.data.conversion_rates);
                }
            })
            .catch(error => console.error("Error fetching rates:", error));
    }, [baseCurrency]);

    const popularCurrencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"];
    const exoticCurrencies = ["VES", "IRR", "LBP", "MGA", "LAK", "UZS"];

    const filteredRates = Object.entries(rates)
        .filter(([currency]) => currency !== baseCurrency) // Исключаем базовую валюту
        .filter(([currency]) => {
            if (filter === "popular") return popularCurrencies.includes(currency);
            if (filter === "exotic") return exoticCurrencies.includes(currency);
            return true;
        })
        .filter(([currency]) => currency.includes(search.toUpperCase())); // Поиск

    const sortedRates = [...filteredRates].sort((a, b) => {
        if (sort === "asc") return a[0].localeCompare(b[0]);
        if (sort === "desc") return b[0].localeCompare(a[0]);
        if (sort === "value-asc") return a[1] - b[1];
        if (sort === "value-desc") return b[1] - a[1];
        return 0;
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-6">Exchange Rates</h1>


                <label className="text-lg font-semibold text-left">Base Currency:</label>
                <select
                    className="p-3 border rounded-lg w-full mb-4"
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                >
                    {Object.keys(rates).map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>


                <input
                    className="p-3 border rounded-lg w-full mb-4"
                    type="text"
                    placeholder="Search currency"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="bg-gray-200 p-3 rounded-lg shadow-md mb-4">
                    <h2 className="text-lg font-semibold mb-2">Filter by category:</h2>
                    <div className="flex gap-3 justify-center">
                        <button
                            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                                filter === "all" ? "bg-blue-600" : "bg-gray-500"
                            }`}
                            onClick={() => setFilter("all")}
                        >
                            🌍 All
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                                filter === "popular" ? "bg-blue-600" : "bg-gray-500"
                            }`}
                            onClick={() => setFilter("popular")}
                        >
                            ⭐ Popular
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                                filter === "exotic" ? "bg-blue-600" : "bg-gray-500"
                            }`}
                            onClick={() => setFilter("exotic")}
                        >
                            🏝 Exotic
                        </button>
                    </div>
                </div>

                <div className="bg-gray-200 p-3 rounded-lg shadow-md mb-4">
                    <h2 className="text-lg font-semibold mb-2">Sort by:</h2>
                    <div className="flex gap-3 justify-center">
                        <button
                            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                                sort === "asc" ? "bg-green-600" : "bg-gray-500"
                            }`}
                            onClick={() => setSort("asc")}
                        >
                            🔤 A-Z
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                                sort === "desc" ? "bg-green-600" : "bg-gray-500"
                            }`}
                            onClick={() => setSort("desc")}
                        >
                            🔠 Z-A
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                                sort === "value-asc" ? "bg-green-600" : "bg-gray-500"
                            }`}
                            onClick={() => setSort("value-asc")}
                        >
                            📈 Value ↑
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                                sort === "value-desc" ? "bg-green-600" : "bg-gray-500"
                            }`}
                            onClick={() => setSort("value-desc")}
                        >
                            📉 Value ↓
                        </button>
                    </div>
                </div>

                <div className="p-4 bg-white rounded shadow h-64 overflow-auto border">
                    {sortedRates.map(([currency, value]) => (
                        <p key={currency} className="text-gray-700 font-medium">
                            {currency}: {value.toFixed(2)}
                        </p>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
                        onClick={() => router.push("/")}
                    >
                        ← Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
