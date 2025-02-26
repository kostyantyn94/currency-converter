import { Suspense } from "react"
import ExchangeRatesClient from "@/components/exchange-rates-client"
import { fetchExchangeRates } from "@/utils/currency"

export default async function ExchangeRates() {

    const initialRates = await fetchExchangeRates("USD")

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-6">Exchange Rates</h1>
                <Suspense fallback={<div>Loading rates...</div>}>
                    <ExchangeRatesClient initialRates={initialRates} />
                </Suspense>
            </div>
        </div>
    )
}

