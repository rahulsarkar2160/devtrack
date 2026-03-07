import CreateProjectForm from "@/components/dashboard/CreateProjectForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })

    if (!user) {
        redirect("/login")
    }

    const projects = await prisma.project.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">
                Welcome, {session.user.email}
            </h1>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
                <CreateProjectForm />
                {projects.length === 0 ? (
                    <p className="text-gray-500">
                        No projects yet. Create one to get started.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/dashboard/projects/${project.id}`}
                                className="block border rounded p-4 shadow-sm hover:bg-gray-50 transition"
                            >
                                {project.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}