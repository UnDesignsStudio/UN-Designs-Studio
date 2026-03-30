export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-cyan-50 px-6 py-16 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-3xl border border-slate-300/70 bg-white/80 p-10 shadow-xl backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/80">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          UN Designs Studio
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Your Next.js app is deployed and running! This page is served from
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            src/app/page.tsx
          </code>
          .
        </p>
        <p className="rounded-xl bg-cyan-500/10 p-4 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200">
          Update this component with your custom content, commit, and push to
          your `main` branch to redeploy.
        </p>
      </section>
    </main>
  );
}
