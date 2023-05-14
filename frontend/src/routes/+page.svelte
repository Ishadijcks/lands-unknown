<script>
  import { SocketClient } from "$lib/SocketClient.ts";
  import { RequestType } from "common/connection/requests/RequestType";

  const server = new SocketClient();

  const send = () => {
    server.sendExampleRequest({
      type: RequestType.Example,
      amount: 4,
    });
  };
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={send}>Send</button>
