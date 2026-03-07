import CreateTaskForm from "@/components/dashboard/CreateTaskForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import TaskItem from "@/components/dashboard/TaskItem"

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
        <div className="p-8">
            <h1 className="text-2xl font-bold">{project.name}</h1>

            <p className="mt-4 text-gray-600">
                Project ID: {project.id}
            </p>

            <div className="mt-8">
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">Tasks</h2>

                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{completionPercentage}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded h-3">
                            <div
                                className="bg-black h-3 rounded transition-all"
                                style={{ width: `${completionPercentage}%` }}
                            />
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                            {completedTasks} of {totalTasks} tasks completed
                        </p>
                    </div>

                    <CreateTaskForm projectId={project.id} />

                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks yet.</p>
                    ) : (
                        <div className="space-y-2">
                            {tasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}