import { Button } from "./ui/button";

interface SortButtonsProps {
    sort: string;
    onSortChange: (newSort: string) => void;
}

const sortOptions = [
    { value: "asc", label: "🔤 A-Z" },
    { value: "desc", label: "🔠 Z-A" },
    { value: "value-asc", label: "📈 Value ↑" },
    { value: "value-desc", label: "📉 Value ↓" },
];

export const SortButtons = ({ sort, onSortChange }: SortButtonsProps) => {
    return (
        <div className="flex gap-3 justify-center">
            {sortOptions.map((option) => (
                <Button
                    key={option.value}
                    className={`px-4 py-2 rounded-lg text-white font-medium ${
                        sort === option.value ? "bg-green-600" : "bg-gray-500"
                    }`}
                    onClick={() => onSortChange(option.value)}
                >
                    {option.label}
                </Button>
            ))}
        </div>
    );
};
