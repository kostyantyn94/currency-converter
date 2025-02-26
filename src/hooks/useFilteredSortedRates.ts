import { useState, useMemo } from "react";
import { filterRates, sortRates } from "@/utils/currency";

export const useFilteredSortedRates = (rates: Record<string, number>, baseCurrency: string) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("default");

    const filteredRates = useMemo(() => filterRates(rates, baseCurrency, filter, search), [rates, baseCurrency, filter, search]);
    const sortedRates = useMemo(() => sortRates(filteredRates, sort), [filteredRates, sort]);

    return { search, setSearch, filter, setFilter, sort, setSort, sortedRates };
};
