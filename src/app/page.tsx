export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Welcome to UN Designs Studio
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          You are now live on Vercel with your app from <strong>src/app/page.tsx</strong>.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 p-6 dark:border-slate-700">
            <h2 className="text-2xl font-semibold">Project status</h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              Next.js App Router setup is correct, deployment target is working, route served as expected.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 p-6 dark:border-slate-700">
            <h2 className="text-2xl font-semibold">Next step</h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              Replace this content with your actual website layout and components.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
