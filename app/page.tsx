import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          DevTrack
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-black"
          >
            Login
          </Link>

          <Link
            href="/login"
            className="bg-black text-white px-4 py-2 rounded text-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold max-w-2xl text-slate-900 leading-tight">
          Manage Projects and Tasks Without the Chaos
        </h2>

        <p className="mt-6 text-gray-600 max-w-xl">
          DevTrack helps you organize projects, track tasks, and stay
          productive with a simple and focused workflow.
        </p>

        <Link
          href="/login"
          className="mt-8 bg-black text-white px-6 py-3 rounded"
        >
          Start Managing Tasks
        </Link>
      </section>

      {/* Features */}
      <section className="px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">              Project Workspaces
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Organize tasks into dedicated project workspaces for
              better clarity and focus.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">              Task Tracking
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Create, complete, and delete tasks while tracking
              progress across your projects.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">              Secure Access
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              User authentication and protected routes ensure each
              workspace stays private.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 pb-6">
        Built with Next.js • MongoDB • Prisma • NextAuth
      </footer>

    </main>
  )
}