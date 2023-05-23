<script lang="ts">
  import { ZodError } from "zod";
  import { tokenStorage } from "$lib/TokenStorage";

  let email = "";
  let password = "";

  let error: ZodError | null;
  $: errorMessages =
    error?.issues.map((issue) => {
      return issue.message;
    }) ?? [];
  $: errorPaths =
    error?.issues.flatMap((issue) => {
      return issue.path;
    }) ?? [];

  $: errorClass = (path: string) => {
    return errorPaths.includes(path) ? "input-error" : "";
  };

  const login = async () => {
    error = null;
    await fetch(new URL("http://localhost:8999/login"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          error = data.error;
          return;
        }
        tokenStorage.update(() => {
          return {
            userName: data.userName,
            token: data.token,
          };
        });
      });
  };
</script>

<div class="flex flex-col space-y-2">
  <label class="label">
    <input class="input {errorClass('email')}" type="email" placeholder="Email" bind:value={email} />
  </label>
  <label class="label">
    <input class="input {errorClass('password')}" type="password" placeholder="Password" bind:value={password} />
  </label>
  {#if error}
    <ul class="list">
      {#each errorMessages as errorMessage}
        <li class="text-error-400">{errorMessage}</li>
      {/each}
    </ul>
  {/if}
  <div class="flex flex-row justify-center">
    <button class="btn variant-filled-primary" on:click={login}> Log In </button>
  </div>
</div>
