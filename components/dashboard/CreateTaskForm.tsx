"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateTaskForm({ projectId }: { projectId: string }) {
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            setError("Please enter a task title")
            return
        }

        setError("")
        setLoading(true)

        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    projectId,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to create task")
                return
            }

            setTitle("")
            router.refresh()
        } catch (error) {
            console.error("Failed to create task:", error)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mb-4">
            {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    placeholder="New task..."
                    className="border border-border bg-input text-foreground placeholder:text-placeholder p-2 rounded w-full outline-none focus:ring-2 focus:ring-foreground" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-4 rounded"
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </form>
        </div>
    )
}