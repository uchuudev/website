<script lang="ts">
  import { onDestroy, onMount, type Snippet } from "svelte";
  import * as d3 from "d3";

  interface Props {
    children?: Snippet<[]>;
  }

  const { children }: Props = $props();

  let svgRef: SVGSVGElement | null = null;
  let dimensions = $state({ width: 0, height: 0 });
  let cleanupShooting: (() => void) | null = null;

  function createStars(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, width: number, height: number) {
    const defs = svg.append("defs");
    const gradient = defs.append("radialGradient").attr("id", "skyGradient").attr("cx", "50%").attr("cy", "50%").attr("r", "70%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#1a1a2e").attr("stop-opacity", 1);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#0f0f1a").attr("stop-opacity", 1);

    svg.append("rect").attr("width", width).attr("height", height).attr("fill", "url(#skyGradient)");

    const numStars = 120;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1 + 0.3,
      brightness: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 2 + 1
    }));

    const starGroups = svg.selectAll(".star").data(stars).enter().append("g").attr("class", "star").attr("transform", d => `translate(${d.x}, ${d.y})`);
    starGroups.append("circle").attr("r", d => d.radius).attr("fill", "white").attr("opacity", d => d.brightness);
    starGroups.append("circle").attr("r", d => d.radius * 2).attr("fill", "white").attr("opacity", d => d.brightness * 0.1);

    starGroups.select("circle").transition().duration(2500 + Math.random() * 1500).ease(d3.easeSinInOut).attr("opacity", () => Math.random() * 0.8 + 0.2)
      .on("end", function repeat() {
        d3.select(this).transition().duration(2500 + Math.random() * 1500).ease(d3.easeSinInOut).attr("opacity", Math.random() * 0.8 + 0.2).on("end", repeat);
      });

    let shootingStarActive = false;
    let timeoutId: number | null = null;

    const createShootingStar = () => {
      if (shootingStarActive) return;
      shootingStarActive = true;
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.3;
      const endX = startX + (Math.random() * 200 + 100);
      const endY = startY + (Math.random() * 100 + 50);

      const shootingStar = svg.append("line").attr("x1", startX).attr("y1", startY).attr("x2", startX).attr("y2", startY).attr("stroke", "white").attr("stroke-width", 2).attr("opacity", 0.8);

      shootingStar.transition().duration(1500).ease(d3.easeQuadOut).attr("x2", endX).attr("y2", endY).attr("opacity", 0).remove().on("end", () => {
        shootingStarActive = false;
      });
    };

    const scheduleNext = () => {
      timeoutId = window.setTimeout(() => {
        if (Math.random() < 0.2) createShootingStar();
        scheduleNext();
      }, 4000 + Math.random() * 4000);
    };

    scheduleNext();

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      shootingStarActive = false;
      svg.selectAll("*").interrupt();
      svg.selectAll("*").remove();
    };
  }

  function handleResize() {
    if (!svgRef) return;
    const width = window.innerWidth;
    const height = document.documentElement.scrollHeight;
    dimensions = { width, height };

    const svg = d3.select(svgRef);
    cleanupShooting?.();
    cleanupShooting = createStars(svg, width, height);
  }

  onMount(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onDestroy(() => {
    window.removeEventListener("resize", handleResize);
    cleanupShooting?.();
  });
</script>

<div class="absolute inset-0 z-1 overflow-x-hidden" style={`height: ${dimensions.height}px`}>
  <svg bind:this={svgRef} {...{ width: dimensions.width, height: dimensions.height }} class="absolute inset-0" />
  <div class="relative z-10 overflow-x-hidden">
    {@render children?.()}
  </div>
</div>
