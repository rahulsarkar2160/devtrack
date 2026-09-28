"use client"

interface TaskFiltersProps {
    filter: "ALL" | "PENDING" | "COMPLETED"
    onFilterChange: (filter: "ALL" | "PENDING" | "COMPLETED") => void
}

export default function TaskFilters({
    filter,
    onFilterChange,
}: TaskFiltersProps) {
    const filters = ["ALL", "PENDING", "COMPLETED"] as const

    return (
        <div className="flex gap-2 mb-4">
            {filters.map((item) => (
                <button
                    key={item}
                    onClick={() => onFilterChange(item)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${filter === item
                            ? "bg-slate-900 text-white"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    {item === "ALL"
                        ? "All"
                        : item === "PENDING"
                            ? "Pending"
                            : "Completed"}
                </button>
            ))}
        </div>
    )
}