"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateProjectForm() {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setError("Please enter a project name")
            return
        }

        setError("")
        setLoading(true)

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to create project")
                return
            }

            setName("")
            setOpen(false)
            router.refresh()
        } catch (error) {
            console.error("Failed to create project:", error)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* New Project Button */}
            <button
                onClick={() => {
                    setOpen(true)
                    setError("")
                }} className="bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition"
            >
                + New Project
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Create a new project
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Give your project a name to get started.
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-slate-400 hover:text-slate-700 text-xl"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Project name
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Portfolio Website"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpen(false)
                                        setName("")
                                        setError("")
                                    }}
                                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition"
                                >
                                    {loading ? "Creating..." : "Create Project"}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    )
}