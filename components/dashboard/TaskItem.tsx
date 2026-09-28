"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Task {
    id: string
    title: string
    status: "PENDING" | "COMPLETED"
}

export default function TaskItem({ task }: { task: Task }) {
    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const toggleStatus = async () => {
        setError("")
        setLoading(true)

        try {
            const res = await fetch("/api/tasks", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ taskId: task.id }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to update task")
                return
            }

            router.refresh()
        } catch (error) {
            console.error("Failed to update task:", error)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const deleteTask = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setError("")
        setLoading(true)

        try {
            const res = await fetch("/api/tasks", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ taskId: task.id }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to delete task")
                return
            }

            router.refresh()
        } catch (error) {
            console.error("Failed to delete task:", error)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {error && (
                <p className="text-sm text-red-600 mb-2">
                    {error}
                </p>
            )}

            <div
                className={`border rounded p-3 flex justify-between items-center cursor-pointer ${loading ? "opacity-70" : ""
                    } ${task.status === "COMPLETED"
                        ? "bg-green-50 line-through text-gray-500"
                        : ""
                    }`}
                onClick={loading ? undefined : toggleStatus}            >
                <span>{task.title}</span>

                <div className="flex items-center gap-4">
                    <span className="text-sm">{task.status}</span>

                    <button
                        onClick={deleteTask}
                        disabled={loading}
                        className="text-red-500 text-sm hover:underline disabled:opacity-50"
                    >
                        {loading ? "..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}