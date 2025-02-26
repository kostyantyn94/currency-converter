import { Button } from "./ui/button";

interface FilterButtonsProps {
    filter: string;
    onFilterChange: (newFilter: string) => void;
}

export const FilterButtons = ({ filter, onFilterChange }: FilterButtonsProps) => {
    return (
        <div className="flex gap-3 justify-center">
            {["all", "popular", "exotic"].map((category) => (
                <Button
                    key={category}
                    className={`px-6 py-2 rounded-lg text-white font-medium ${
                        filter === category ? "bg-blue-500" : "bg-gray-500"
                    }`}
                    onClick={() => onFilterChange(category)}
                >
                    {category === "all" ? "🌍 All" : category === "popular" ? "⭐ Popular" : "🏝 Exotic"}
                </Button>
            ))}
        </div>
    );
};
