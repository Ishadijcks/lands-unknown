<script lang="ts">
  import { SocketClient } from "$lib/luclient/core/connection/SocketClient.ts";
  import { gameData } from "common/content/GameData";
  import { LuClient } from "$lib/luclient/LuClient.ts";
  import Skills from "$lib/components/Skills.svelte";

  const socket = new SocketClient();
  let luClient = new LuClient(gameData, socket);

  // TODO(@Isha): Fix properly with stores?
  luClient.socket.onMessage.subscribe(() => {
    luClient = luClient;
  });
</script>

<div style="display: flex; flex-direction: column">
  <span>This is good game</span>
  <Skills skills={luClient.skills} />
</div>
