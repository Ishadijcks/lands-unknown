<script>
  import { SocketClient } from "$lib/luclient/core/connection/SocketClient.ts";
  import { gameData } from "common/content/GameData";
  import { LuClient } from "$lib/luclient/LuClient.ts";
  import { SkillHrid } from "common/player/skills/SkillHrid.ts";

  const socket = new SocketClient();
  let luClient = new LuClient(gameData, socket);

  // TODO(@Isha): Fix properly with stores?
  luClient.socket.onMessage.subscribe(() => {
    luClient = luClient;
  });
</script>

<div style="display: flex; flex-direction: column">
  <span>This is a good game</span>
  <span>Money: {luClient.skills.getLevel(SkillHrid.Woodcutting)}</span>
</div>
