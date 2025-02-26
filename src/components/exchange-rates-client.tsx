"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { CurrencyInput } from "./currency-input";
import { useFetchExchangeRates } from "@/hooks/useFetchExchangeRates";
import { useFilteredSortedRates } from "@/hooks/useFilteredSortedRates";
import { FilterButtons } from "@/components/filter-buttons";
import { SortButtons } from "@/components/sort-buttons";

interface ExchangeRatesClientProps {
    initialRates: Record<string, number>;
}

export default function ExchangeRatesClient({ initialRates }: ExchangeRatesClientProps) {
    const { baseCurrency, setBaseCurrency, rates } = useFetchExchangeRates(initialRates);
    const { search, setSearch, filter, setFilter, sort, setSort, sortedRates } = useFilteredSortedRates(rates, baseCurrency);
    const router = useRouter();

    return (
        <>
            <select
                className="p-3 border rounded-lg w-full mb-4"
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
            >
                {Object.keys(rates).map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>

            <div className="space-y-4">
                <CurrencyInput label="" value={search} onChange={setSearch} placeholder="Search currency" type="text" />

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 text-center">Filter by category:</h2>
                    <FilterButtons filter={filter} onFilterChange={setFilter} />
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 text-center">Sort by:</h2>
                    <SortButtons sort={sort} onSortChange={setSort} />
                </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg shadow h-64 overflow-auto border">
                {sortedRates.map(([currency, value]) => (
                    <p key={currency} className="text-gray-700 font-medium">
                        {currency}: {value.toFixed(2)}
                    </p>
                ))}
            </div>

            <div className="mt-6">
                <Button
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
                    onClick={() => router.push("/")}
                >
                    ← Go Back
                </Button>
            </div>
        </>
    );
}
