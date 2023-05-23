<script lang="ts">
  import { Tab, TabGroup } from "@skeletonlabs/skeleton";
  import { ZodError } from "zod";

  let tabSet = 0;

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
    await fetch(new URL("http://localhost:8999/signup"), {
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
        }
      });
  };
</script>

<div class="card">
  <TabGroup class="p-4">
    <Tab bind:group={tabSet} name="signup" value={0}>Log In</Tab>
    <Tab bind:group={tabSet} name="login" value={1}>Sign Up</Tab>
    <Tab bind:group={tabSet} name="guest" value={2}>Guest</Tab>
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
      {#if tabSet === 0}
        <div class="flex flex-col space-y-2">
          <label class="label">
            <input class="input {errorClass('email')}" type="email" placeholder="Email" bind:value={email} />
          </label>
          <label class="label">
            <input
              class="input {errorClass('password')}"
              type="password"
              placeholder="Password"
              bind:value={password}
            />
          </label>
          <div class="flex flex-row justify-center">
            <a href="/play">
              <button class="btn variant-filled-primary"> Play </button>
            </a>
          </div>
        </div>
      {:else if tabSet === 1}
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
            <input
              class="input {errorClass('password')}"
              type="password"
              placeholder="Password"
              bind:value={password}
            />
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
      {:else if tabSet === 2}
        <span>Guest Login</span>
      {/if}
    </svelte:fragment>
  </TabGroup>
</div>
