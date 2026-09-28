import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            DevTrack
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 shadow-sm mb-6">
            Simple project management for developers
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-slate-900">
            Plan projects.
            <br />
            Track tasks.
            <br />
            <span className="text-slate-500">
              Ship with clarity.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            DevTrack gives you a simple workspace to organize
            projects, manage tasks, and track progress from one
            place.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto border border-slate-300 bg-white text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">

            {/* Fake browser header */}
            <div className="border-b border-slate-200 px-5 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
            </div>

            {/* Dashboard preview */}
            <div className="p-6 md:p-8">

              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-slate-500">
                    Dashboard
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    Your Projects
                  </h2>
                </div>

                <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">
                  + New Project
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Project Card */}
                <div className="border border-slate-200 rounded-xl p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        DevTrack
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        7 tasks
                      </p>
                    </div>

                    <span className="text-sm font-medium">
                      71%
                    </span>
                  </div>

                  <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-900 rounded-full"
                      style={{ width: "71%" }}
                    />
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    5 of 7 tasks completed
                  </p>
                </div>

                {/* Project Card */}
                <div className="border border-slate-200 rounded-xl p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Portfolio
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        4 tasks
                      </p>
                    </div>

                    <span className="text-sm font-medium">
                      50%
                    </span>
                  </div>

                  <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-900 rounded-full"
                      style={{ width: "50%" }}
                    />
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    2 of 4 tasks completed
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Everything you need
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Keep your work organized
            </h2>

            <p className="text-slate-600 mt-4 max-w-xl mx-auto">
              A focused workspace for managing projects and
              keeping track of the work that matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="border border-slate-200 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg font-bold">
                P
              </div>

              <h3 className="font-semibold text-lg mt-5">
                Project Management
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Create and organize multiple projects in a
                dedicated workspace.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg font-bold">
                T
              </div>

              <h3 className="font-semibold text-lg mt-5">
                Task Tracking
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Create tasks, mark them complete, and keep
                track of what still needs to be done.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg font-bold">
                %
              </div>

              <h3 className="font-semibold text-lg mt-5">
                Progress Visibility
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                See task completion progress and understand
                how much work remains.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Built with modern technologies
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Full-stack from frontend to database
          </h2>

          <p className="mt-4 text-slate-600">
            DevTrack is built using a modern Next.js full-stack
            architecture.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "MongoDB",
              "Prisma",
              "NextAuth",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl px-6 py-12 md:px-12 text-center text-white">

          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to get organized?
          </h2>

          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            Start managing your projects and tasks with DevTrack.
          </p>

          <Link
            href="/signup"
            className="inline-block mt-7 bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-sm font-semibold text-slate-900">
            DevTrack
          </p>

          <p className="text-sm text-slate-500">
            Built with Next.js • MongoDB • Prisma • NextAuth
          </p>

        </div>
      </footer>

    </main>
  )
}