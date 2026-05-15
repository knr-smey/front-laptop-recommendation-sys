<template>
  <div class="flex flex-col justify-between rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,36,0.92),rgba(6,12,23,0.94))] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-10">
    <div>
      <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400/80">Laptop Curator</p>
      <h1 class="mt-4 font-['Space_Grotesk'] text-4xl font-bold leading-tight text-white sm:text-5xl">
        Find the machine that
        <span class="bg-gradient-to-r from-[#7ce5ce] via-[#ffd166] to-[#ff8c69] bg-clip-text text-transparent">matches your vibe</span>
      </h1>
      <p class="mt-4 max-w-xl text-sm leading-7 text-slate-200/80 sm:text-base">
        Save your shortlist, keep your filters, and pick up where you left off. The concierge keeps learning your
        preferences with every search.
      </p>
    </div>

    <div class="mt-8 grid gap-3 sm:grid-cols-2">
      <div class="rounded-[22px] border border-white/10 bg-white/4 p-4">
        <p class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">Highlights</p>
        <p class="mt-2 font-['Space_Grotesk'] text-2xl font-semibold text-white">Tailored picks</p>
        <p class="mt-2 text-sm text-slate-200/70">Filter, compare, and refine with a calm, guided workflow.</p>
      </div>
      <div class="rounded-[22px] border border-white/10 bg-white/4 p-4">
        <p class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">Saved</p>
        <p class="mt-2 font-['Space_Grotesk'] text-2xl font-semibold text-white">Smart history</p>
        <p class="mt-2 text-sm text-slate-200/70">Revisit every recommendation with a single tap.</p>
      </div>
    </div>

    <div class="mt-8 flex flex-wrap items-center gap-3">
      <span class="rounded-full border border-white/12 bg-white/4 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">Performance</span>
      <span class="rounded-full border border-white/12 bg-white/4 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">Creator</span>
      <span class="rounded-full border border-white/12 bg-white/4 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">Everyday</span>
    </div>
  </div>
</template>
