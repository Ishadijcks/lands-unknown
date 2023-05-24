<script lang="ts">
  import { SocketClient } from "$lib/luclient/core/connection/SocketClient.ts";
  import { gameData } from "common/content/GameData";
  import { LuClient } from "$lib/luclient/LuClient.ts";
  import Skills from "$lib/components/Skills.svelte";

  import { AppShell } from "@skeletonlabs/skeleton";
  import ActivityQueueDisplay from "$lib/components/ActivityQueueDisplay.svelte";
  import { ActivityHrid } from "common/game/activities/ActivityHrid";
  import { RequestType } from "common/connection/requests/RequestType";
  import InventoryDisplay from "$lib/components/InventoryDisplay.svelte";
  import { tokenStorage } from "$lib/TokenStorage";
  import { goto } from "$app/navigation";

  tokenStorage.subscribe((token) => {
    if (!token) {
      goto("/");
    }
  });

  let luClient: LuClient;
  if ($tokenStorage?.token) {
    const socket = new SocketClient($tokenStorage.token);
    luClient = new LuClient(gameData, socket);

    // TODO(@Isha): Fix properly with stores?
    luClient.socket.onMessage.subscribe(() => {
      luClient = luClient;
    });
  }

  const sendActivity = (hrid: ActivityHrid) => {
    luClient.socket.sendScheduleActivityRequest({
      type: RequestType.ScheduleActivity,
      repetitions: 3,
      activityHrid: hrid,
    });
  };

  const sendForest = () => {
    sendActivity(ActivityHrid.ExploreForest);
  };

  const sendFish = () => {
    sendActivity(ActivityHrid.Fish);
  };
</script>

<AppShell>
  <svelte:fragment slot="header">
    <div class="card p-4 m-2">
      <ActivityQueueDisplay activityQueue={luClient.activityQueue} />
    </div>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <ul class="list mx-2 h-full space-y-2">
      <li class="card p-4">
        <Skills skills={luClient.skills} />
      </li>
      <li class="card p-4">
        <span class="h-48">Secret goes here</span>
      </li>
    </ul>
  </svelte:fragment>
  <svelte:fragment slot="sidebarRight">
    <div class="card mx-2 p-4">
      <InventoryDisplay inventory={luClient.inventory} />
    </div>
  </svelte:fragment>
  <div class="card h-full p-4">
    World Map goes here
    <button class="btn variant-filled-success" on:click={sendForest}>Forest</button>
    <button class="btn variant-filled-surface" on:click={sendFish}>Fish</button>
  </div>

  <svelte:fragment slot="pageFooter">
    <div class="card h-48 mt-2 mb-2 p-4">Chat goes here</div>
  </svelte:fragment>
</AppShell>
