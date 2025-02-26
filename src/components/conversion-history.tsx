interface ConversionHistoryProps {
    history: { base: string; target: string; amount: number; result: number }[]
    onClear: () => void
}

export function ConversionHistory({ history, onClear }: ConversionHistoryProps) {
    if (history.length === 0) return null

    return (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-gray-400">🕒</span> Recent Conversions
                </h2>
                <button onClick={onClear} className="text-sm text-red-400 hover:text-red-500 transition-colors">
                    Clear
                </button>
            </div>
            <div className="max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="space-y-2">
                    {history.map((entry, index) => (
                        <div
                            key={index}
                            className="py-2 border-b border-gray-100 last:border-none text-sm text-gray-600 flex items-center gap-2"
                        >
              <span className="font-medium">
                {entry.amount} {entry.base}
              </span>
                            <span className="text-gray-400">→</span>
                            <span className="font-medium">
                {entry.result.toFixed(2)} {entry.target}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

