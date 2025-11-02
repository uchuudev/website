<script lang="ts">
  import NightSky from "./components/NightSky.svelte";
  import OrbitalPlanets from "./components/OrbitalPlanets.svelte";
  import { onMount } from "svelte";

  let contentEl: HTMLDivElement | null = null;
  let contentWidth = $state(0);
  let contentHeight = $state(0);

  onMount(() => {
    if (!contentEl) return;
    contentHeight = contentEl.clientHeight;
    contentWidth = contentEl.clientWidth;
  });
</script>

<div class="relative text-stone-50 font-mono overflow-x-hidden bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] min-h-screen">
  <NightSky>
    <main class="h-screen w-screen flex justify-center items-center overflow-hidden font-sans">
      <div class="relative flex justify-center items-center">
        <OrbitalPlanets {contentWidth} {contentHeight}>
          <div class="text-center px-8" bind:this={contentEl}>
            <h1 class="text-6xl tracking-wide whitespace-nowrap">- 宇宙 -</h1>
            <p class="mt-1">
              from <a href="https://tomo.uchuu.dev" class="hover:underline">thomas</a> & friends
            </p>
          </div>
        </OrbitalPlanets>
      </div>
    </main>

    <section class="max-w-screen-md mx-auto p-4">
      <h3 class="text-4xl mb-8">Missions</h3>
      <div class="flex flex-col gap-8">
        <div>
          <h4 class="text-2xl">Coming Soon</h4>
        </div>
      </div>
    </section>

    <section class="max-w-screen-md mx-auto p-4 mt-12">
      <h5 class="text-center text-md">
        <a href="https://github.com/uchuuio" class="hover:underline">Github</a>
      </h5>
    </section>
  </NightSky>
</div>