"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateTaskForm({ projectId }: { projectId: string }) {
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) return

        setLoading(true)

        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                projectId,
            }),
        })

        setLoading(false)

        if (res.ok) {
            setTitle("")
            router.refresh()
        } else {
            alert("Failed to create task")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="New task..."
                className="border p-2 rounded w-full"
                value={title}
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
    )
}