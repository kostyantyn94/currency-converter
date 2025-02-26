import { Suspense } from "react"
import CurrencyConverterClient from "@/components/currency-converter-client"
import { fetchExchangeRates } from "@/utils/currency"

export default async function Home() {

    const initialRates = await fetchExchangeRates("USD")
    const initialCurrencies = Object.keys(initialRates)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">💱 Currency Converter</h1>
                <Suspense fallback={<div>Loading converter...</div>}>
                    <CurrencyConverterClient initialRates={initialRates} initialCurrencies={initialCurrencies} />
                </Suspense>
            </div>
        </div>
    )
}

