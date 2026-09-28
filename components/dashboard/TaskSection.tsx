"use client"

import { useState } from "react"
import TaskFilters from "@/components/dashboard/TaskFilters"
import TaskItem from "@/components/dashboard/TaskItem"

interface Task {
    id: string
    title: string
    status: "PENDING" | "COMPLETED"
}

export default function TaskSection({ tasks }: { tasks: Task[] }) {
    const [filter, setFilter] = useState<
        "ALL" | "PENDING" | "COMPLETED"
    >("ALL")

    const filteredTasks = tasks.filter((task) => {
        if (filter === "PENDING") {
            return task.status === "PENDING"
        }

        if (filter === "COMPLETED") {
            return task.status === "COMPLETED"
        }

        return true
    })

    return (
        <div>
            <TaskFilters
                filter={filter}
                onFilterChange={setFilter}
            />

            {filteredTasks.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center">
                    <p className="text-sm text-slate-500">
                        No {filter === "ALL" ? "" : filter.toLowerCase() + " "}tasks found.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    )
}