import CreateProjectForm from "@/components/dashboard/CreateProjectForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import SignOutButton from "@/components/dashboard/SignOutButton"

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
        include: {
            tasks: true,
        },
        orderBy: { createdAt: "desc" },
    })

    const totalProjects = projects.length

    const totalTasks = projects.reduce(
        (total, project) => total + project.tasks.length,
        0
    )

    const completedTasks = projects.reduce(
        (total, project) =>
            total +
            project.tasks.filter((task) => task.status === "COMPLETED").length,
        0
    )

    const completionPercentage =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100)

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8">

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link
                            href="/"
                            className="text-xl font-bold text-slate-900 hover:text-slate-700 transition"
                        >
                            DevTrack
                        </Link>

                        <p className="text-sm text-slate-500 mt-4">
                            Dashboard
                        </p>

                        <h1 className="text-3xl font-bold text-slate-900 mt-1">
                            Welcome back
                        </h1>

                        <p className="text-slate-500 mt-1">
                            {session.user.email}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <SignOutButton />
                        <CreateProjectForm />
                    </div>                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <p className="text-sm text-slate-500">
                            Projects
                        </p>

                        <p className="text-3xl font-bold text-slate-900 mt-2">
                            {totalProjects}
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <p className="text-sm text-slate-500">
                            Total Tasks
                        </p>

                        <p className="text-3xl font-bold text-slate-900 mt-2">
                            {totalTasks}
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <p className="text-sm text-slate-500">
                            Completed
                        </p>

                        <p className="text-3xl font-bold text-slate-900 mt-2">
                            {completedTasks}
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <p className="text-sm text-slate-500">
                            Overall Progress
                        </p>

                        <p className="text-3xl font-bold text-slate-900 mt-2">
                            {completionPercentage}%
                        </p>
                    </div>

                </div>

                {/* Projects */}
                <div className="mt-10">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                Your Projects
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Keep track of your projects and their progress.
                            </p>
                        </div>
                    </div>

                    {projects.length === 0 ? (

                        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">

                            <h3 className="text-lg font-semibold text-slate-900">
                                No projects yet
                            </h3>

                            <p className="text-sm text-slate-500 mt-2">
                                Create your first project to start tracking your work.
                            </p>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {projects.map((project) => {
                                const projectTotalTasks = project.tasks.length

                                const projectCompletedTasks = project.tasks.filter(
                                    (task) => task.status === "COMPLETED"
                                ).length

                                const projectProgress =
                                    projectTotalTasks === 0
                                        ? 0
                                        : Math.round(
                                            (projectCompletedTasks / projectTotalTasks) * 100
                                        )

                                return (
                                    <Link
                                        key={project.id}
                                        href={`/dashboard/projects/${project.id}`}
                                        className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-200"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-4">

                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">
                                                    {project.name.charAt(0).toUpperCase()}
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-lg text-slate-900 group-hover:text-slate-700 transition">
                                                        {project.name}
                                                    </h3>

                                                    <p className="text-sm text-slate-500 mt-0.5">
                                                        {projectTotalTasks}{" "}
                                                        {projectTotalTasks === 1 ? "task" : "tasks"}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="text-slate-400 group-hover:text-slate-900 transition text-lg">
                                                →
                                            </span>
                                        </div>

                                        {/* Progress */}
                                        <div className="mt-6">

                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-slate-500">
                                                    Progress
                                                </span>

                                                <span className="text-sm font-semibold text-slate-900">
                                                    {projectProgress}%
                                                </span>
                                            </div>

                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-slate-900 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${projectProgress}%`,
                                                    }}
                                                />
                                            </div>

                                            <p className="text-xs text-slate-500 mt-2">
                                                {projectCompletedTasks} of {projectTotalTasks} tasks completed
                                            </p>

                                        </div>
                                    </Link>
                                )
                            })}

                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}