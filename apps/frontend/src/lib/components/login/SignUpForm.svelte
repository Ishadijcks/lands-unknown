<script lang="ts">
  import { ZodError } from "zod";
  import { tokenStorage } from "$lib/TokenStorage";
  import { PUBLIC_SERVER_URL } from "$env/static/public";

  let email = "";
  let userName = "";
  let password = "";
  let confirmation = "";

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

  const signup = async () => {
    error = null;
    await fetch(new URL(`http://${PUBLIC_SERVER_URL}/signup`), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        userName,
        password,
        confirmation,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
    <input
      class="input {errorClass('userName')}"
      minlength="3"
      maxlength="20"
      type="text"
      placeholder="Username"
      bind:value={userName}
    />
  </label>
  <label class="label">
    <input class="input {errorClass('email')}" type="email" placeholder="Email" bind:value={email} />
  </label>

  <label class="label">
    <input class="input {errorClass('password')}" type="password" placeholder="Password" bind:value={password} />
  </label>
  <label class="label">
    <input
      class="input {errorClass('confirmation')}"
      type="password"
      placeholder="Password Confirmation"
      bind:value={confirmation}
    />
  </label>
  {#if error}
    <ul class="list">
      {#each errorMessages as errorMessage}
        <li class="text-error-400">{errorMessage}</li>
      {/each}
    </ul>
  {/if}
  <div class="flex flex-row justify-center">
    <button class="btn variant-filled-primary" on:click={signup}> Sign Up </button>
  </div>
</div>
