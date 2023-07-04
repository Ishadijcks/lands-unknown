<script lang="ts">
  import { AppRail, AppRailTile } from "@skeletonlabs/skeleton";

  import { drawerStore } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import { gameData } from "common/content/GameData";
  import Icon from "$lib/components/atoms/Icon.svelte";

  $: listboxItemActive = (href: string) => ($page.url.pathname?.endsWith(href) ? "bg-primary-active-token" : "");

  const items = Object.values(gameData.itemDetailMap).sort((a, b) => a.name - b.name);
  const actions = Object.values(gameData.actionDetailMap).sort((a, b) => a.name - b.name);
  const skills = Object.values(gameData.skillDetailMap).sort((a, b) => a.name - b.name);
  const activities = Object.values(gameData.activityDetailMap).sort((a, b) => a.name - b.name);

  export type List = { href: string; label: string }[];

  const processList = (list: any[]) => {
    return list.map((entry) => ({
      href: "/docs" + entry.hrid,
      label: entry.name,
      icon: entry.icon,
    }));
  };

  const navigationLinks: Record<string, { link: string; icon: string; title: string; list: List }> = {
    "/items": {
      link: "/items",
      title: "Items",
      list: processList(items),
      icon: "bag",
    },
    "/actions": {
      link: "/actions",
      title: "Actions",
      list: processList(actions),
      icon: "lightning",
    },
    "/activities": {
      link: "/activities",
      title: "Activities",
      list: processList(activities),
      icon: "question-mark",
    },
    "/skills": {
      link: "/skills",
      title: "Skills",
      list: processList(skills),
      icon: "skills",
    },
    "/locations": {
      link: "/locations",
      title: "Locations",
      list: [],
      icon: "house",
    },
    "/quests": {
      link: "/quests",
      title: "Quests",
      list: [],
      icon: "compass",
    },
  };

  $: currentRailCategory = Object.keys(navigationLinks).find((key) => $page.url.pathname.includes(key));

  $: submenu = navigationLinks[currentRailCategory ?? "/items"] ?? [];
</script>

<div
  class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ?? ''}"
>
  <AppRail border="border-r border-surface-500/30">
    {#each Object.values(navigationLinks) as category}
      <a href="/docs{category.link}">
        <AppRailTile bind:group={currentRailCategory} name={category.title} value={category.link}>
          <svelte:fragment slot="lead">
            <div class="flex flex-row justify-center">
              <Icon icon={category.icon} />
            </div>
          </svelte:fragment>

          <span>{category.title}</span>
        </AppRailTile>
      </a>
    {/each}
  </AppRail>
</div>
