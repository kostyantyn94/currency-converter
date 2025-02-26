import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface CurrencyInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: "text" | "number"
}

export function CurrencyInput({ label, value, onChange, placeholder, type = "number" }: CurrencyInputProps) {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">{label}</Label>
            <Input
                className="w-full bg-gray-50 border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}

