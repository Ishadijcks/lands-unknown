<script lang="ts">
  import { SocketClient } from "$lib/luclient/core/connection/SocketClient.ts";
  import { gameData } from "common/content/GameData";
  import { LuClient } from "$lib/luclient/LuClient.ts";
  import { tokenStorage } from "$lib/TokenStorage";
  import { goto } from "$app/navigation";
  import type { ConnectionClosedMessage } from "common/connection/messages/ConnectionClosedMessage";
  import { GameState, gameStateStore } from "$lib/GameState";
  import GameDisplay from "$lib/components/GameDisplay.svelte";
  import FullScreenMessage from "$lib/components/atoms/FullScreenMessage.svelte";

  let closedReason: string | null = null;

  tokenStorage.subscribe((token) => {
    if (!token) {
      goto("/");
    }
  });

  let luClient: LuClient;
  if ($tokenStorage?.token) {
    const socket = new SocketClient($tokenStorage.token);
    luClient = new LuClient(gameData, socket);

    luClient.socket.onDisconnect.subscribe((message: ConnectionClosedMessage) => {
      gameStateStore.set(GameState.DISCONNECTED);
      closedReason = message.reason;
    });
    luClient.socket.onConnect.subscribe(() => {
      gameStateStore.set(GameState.PLAYING);
    });

    // TODO(@Isha): Fix properly with stores?
    luClient.socket.onMessage.subscribe(() => {
      luClient = luClient;
    });
  }
</script>

{#if $gameStateStore === GameState.DISCONNECTED}
  <FullScreenMessage>
    <span class="h2">{closedReason}</span>
  </FullScreenMessage>
{:else if $gameStateStore === GameState.PLAYING}
  <GameDisplay {luClient} />
{:else if $gameStateStore === GameState.CONNECTING}
  <FullScreenMessage>
    <span class="h2">Loading...</span>
  </FullScreenMessage>
{/if}
