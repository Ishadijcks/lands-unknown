<script>
  import { SocketClient } from "$lib/luclient/core/connection/SocketClient.ts";
  import { RequestType } from "common/connection/requests/RequestType";
  import { LuClient } from "$lib/luclient/LuClient.ts";

  const socket = new SocketClient();
  let luClient = new LuClient(socket);

  // TODO(@Isha): Fix properly with stores?
  luClient.socket.onMessage.subscribe(() => {
    luClient = luClient;
  });

  const send = () => {
    luClient.socket.sendExampleRequest({
      type: RequestType.Example,
      amount: 4,
    });
  };
</script>

<div style="display: flex; flex-direction: column">
  <span>This is a good game</span>
  <span>Money: {luClient.money}</span>
  <button on:click={send}>Send</button>
</div>
