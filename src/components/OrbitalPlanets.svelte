<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as d3 from "d3";

  export let contentWidth: number;
  export let contentHeight: number;

  let svgRef: SVGSVGElement;
  let animationId: number | null = null;

  function createOrbitalSystem() {
    if (!svgRef || !contentWidth || !contentHeight) return;

    const svg = d3.select(svgRef);
    svg.selectAll("*").remove();

    const svgWidth = 800;
    const svgHeight = 600;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    const minRadius = Math.max(contentWidth, contentHeight) / 2 + 30;

    const planets = [
      { id: "planet1", color: "#facc15", radius: 6, orbitRadius: minRadius,       speed: 1.2, startAngle: 0 },
      { id: "planet2", color: "#7c3aed", radius: 5, orbitRadius: minRadius + 40,  speed: 0.8, startAngle: Math.PI / 2 },
      { id: "planet3", color: "#4ade80", radius: 4, orbitRadius: minRadius + 80,  speed: 0.5, startAngle: Math.PI },
      { id: "planet4", color: "#38bdf8", radius: 5, orbitRadius: minRadius + 120, speed: 0.3, startAngle: Math.PI * 1.5 }
    ];

    svg.selectAll(".orbit").data(planets).enter().append("circle")
      .attr("class", "orbit").attr("cx", centerX).attr("cy", centerY)
      .attr("r", d => d.orbitRadius).attr("fill", "none")
      .attr("stroke", "rgba(255, 255, 255, 0.2)").attr("stroke-width", 1).attr("stroke-dasharray", "3,3");

    const planetGroups = svg.selectAll(".planet").data(planets).enter().append("g").attr("class", "planet");

    planetGroups.append("circle").attr("r", d => d.radius * 2.5).attr("fill", d => d.color).attr("opacity", 0.3).attr("filter", "blur(3px)");
    planetGroups.append("circle").attr("r", d => d.radius).attr("fill", d => d.color).attr("stroke", "rgba(255, 255, 255, 0.8)").attr("stroke-width", 1);

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) * 0.001;
      planetGroups.attr("transform", d => {
        const angle = d.startAngle + elapsed * d.speed;
        const x = centerX + Math.cos(angle) * d.orbitRadius;
        const y = centerY + Math.sin(angle) * d.orbitRadius;
        return `translate(${x}, ${y})`;
      });
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
  }

  function reset() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = null;
    createOrbitalSystem();
  }

  onMount(() => { createOrbitalSystem(); });
  onDestroy(() => { if (animationId) cancelAnimationFrame(animationId); });

  $: if (contentWidth > 0 && contentHeight > 0) { reset(); }
</script>

<div class="relative">
  <svg bind:this={svgRef} width="800" height="600" class="absolute pointer-events-none"
    style={`left: ${-(800 / 2 - contentWidth / 2)}px; top: ${-(600 / 2 - contentHeight / 2)}px; z-index: 1`} />
  <div class="relative z-10 pointer-events-auto">
    <slot />
  </div>
</div>