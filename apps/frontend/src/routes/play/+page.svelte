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
  import RefreshButton from "$lib/components/atoms/RefreshButton.svelte";
  import { luClientStore } from "$lib/luclient/luClientStore";

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
    luClientStore.set(luClient);

    luClient.socket.onDisconnect.subscribe((message: ConnectionClosedMessage) => {
      gameStateStore.set(GameState.DISCONNECTED);
      closedReason = message.reason;
    });

    luClient.socket.onError.subscribe((message: string) => {
      gameStateStore.set(GameState.DISCONNECTED);
      closedReason = message;
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

{#if $gameStateStore === GameState.CONNECTING}
  <FullScreenMessage>
    <span class="h2">Loading...</span>
  </FullScreenMessage>
{:else if $gameStateStore === GameState.DISCONNECTED}
  <FullScreenMessage>
    <div class="flex flex-col space-y-4">
      <span class="h2">{closedReason}</span>
      <RefreshButton message="Refresh" />
    </div>
  </FullScreenMessage>
{:else if $gameStateStore === GameState.PLAYING}
  <GameDisplay {luClient} />
{/if}
