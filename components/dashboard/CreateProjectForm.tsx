"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateProjectForm() {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) return

        setLoading(true)

        const res = await fetch("/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        })

        setLoading(false)

        if (res.ok) {
            setName("")
            router.refresh() // Re-fetch server data
        } else {
            alert("Failed to create project")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                placeholder="New project name"
                className="border p-2 rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-4 rounded"
            >
                {loading ? "Creating..." : "Create"}
            </button>
        </form>
    )
}