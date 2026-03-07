"use client"

import { useRouter } from "next/navigation"

interface Task {
    id: string
    title: string
    status: "PENDING" | "COMPLETED"
}

export default function TaskItem({ task }: { task: Task }) {
    const router = useRouter()

    const toggleStatus = async () => {
        await fetch("/api/tasks", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId: task.id }),
        })
        router.refresh()
    }

    const deleteTask = async (e: React.MouseEvent) => {
        e.stopPropagation() // prevent triggering toggle
        await fetch("/api/tasks", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId: task.id }),
        })
        router.refresh()
    }

    return (
        <div
            className={`border rounded p-3 flex justify-between items-center cursor-pointer ${task.status === "COMPLETED"
                    ? "bg-green-50 line-through text-gray-500"
                    : ""
                }`}
            onClick={toggleStatus}
        >
            <span>{task.title}</span>

            <div className="flex items-center gap-4">
                <span className="text-sm">{task.status}</span>
                <button
                    onClick={deleteTask}
                    className="text-red-500 text-sm hover:underline"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}