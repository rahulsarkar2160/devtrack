import CreateTaskForm from "@/components/dashboard/CreateTaskForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import TaskSection from "@/components/dashboard/TaskSection"

export default async function ProjectPage(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

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

    const project = await prisma.project.findFirst({
        where: {
            id: id,
            userId: user.id,
        },
    })

    if (!project) {
        redirect("/dashboard")
    }

    const tasks = await prisma.task.findMany({
        where: { projectId: project.id },
        orderBy: { createdAt: "desc" },
    })

    const totalTasks = tasks.length
    const completedTasks = tasks.filter(
        (task) => task.status === "COMPLETED"
    ).length

    const completionPercentage =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100)


    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8">
            <div className="max-w-5xl mx-auto">

                {/* Back to Dashboard */}
                <div className="mb-6">
                    <Link
                        href="/dashboard"
                        className="text-sm text-slate-500 hover:text-slate-900 transition"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Project Header */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                            <p className="text-sm text-slate-500">
                                Project
                            </p>

                            <h1 className="text-3xl font-bold text-slate-900 mt-1">
                                {project.name}
                            </h1>

                            <p className="text-sm text-slate-500 mt-2">
                                {totalTasks}{" "}
                                {totalTasks === 1 ? "task" : "tasks"} ·{" "}
                                {completedTasks} completed
                            </p>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className="text-sm text-slate-500">
                                Progress
                            </p>

                            <p className="text-3xl font-bold text-slate-900">
                                {completionPercentage}%
                            </p>
                        </div>

                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">

                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-slate-900 rounded-full transition-all duration-300"
                                style={{
                                    width: `${completionPercentage}%`,
                                }}
                            />
                        </div>

                        <p className="text-sm text-slate-500 mt-2">
                            {completedTasks} of {totalTasks} tasks completed
                        </p>

                    </div>
                </div>

                {/* Tasks */}
                <div className="mt-8">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                Tasks
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Manage the work for this project.
                            </p>
                        </div>
                    </div>

                    {/* Add Task */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">
                            Add a task
                        </h3>

                        <CreateTaskForm projectId={project.id} />
                    </div>

                    {/* Task List */}
                    {tasks.length === 0 ? (
                        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
                            <h3 className="text-lg font-semibold text-slate-900">
                                No tasks yet
                            </h3>
                            <p className="text-sm text-slate-500 mt-2">
                                Add your first task to start tracking progress.
                            </p>
                        </div>
                    ) : (
                        <TaskSection tasks={tasks} />
                    )}

                </div>

            </div>
        </div>
    )
}