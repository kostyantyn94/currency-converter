import { Label } from "./ui/label"
import { Select, SelectItem } from "./ui/select"

interface CurrencySelectorProps {
    label: string
    value: string
    currencies: string[]
    onChange: (value: string) => void
}

export function CurrencySelector({ label, value, currencies, onChange }: CurrencySelectorProps) {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">{label}</Label>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-gray-50 border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            >
                {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                        {currency}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}

