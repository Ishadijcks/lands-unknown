<script lang="ts">
  import { Tab, TabGroup } from "@skeletonlabs/skeleton";
  import SignUpForm from "$lib/components/login/SignUpForm.svelte";
  import LoginForm from "$lib/components/login/LoginForm.svelte";
  import { tokenStorage } from "$lib/TokenStorage";
  import { base } from "$app/paths";

  let tabSet = 0;

  $: isLoggedIn = $tokenStorage?.token != null;
  $: userName = $tokenStorage?.userName;
</script>

<div class="card w-96">
  {#if isLoggedIn}
    <div class="flex flex-col justify-between items-center h-full p-4">
      <div class="flex flex-col items-center">
        <span class="h1">Welcome</span>
        <span class="h3 text-secondary-100">{userName}</span>
      </div>

      <a href="{base}/play">
        <button class="btn variant-filled-primary"> Play! </button>
      </a>
    </div>
  {:else}
    <TabGroup class="p-4">
      <Tab bind:group={tabSet} name="signup" value={0}>Log In</Tab>
      <Tab bind:group={tabSet} name="login" value={1}>Sign Up</Tab>
      <Tab bind:group={tabSet} name="guest" value={2}>Guest</Tab>
      <!-- Tab Panels --->
      <svelte:fragment slot="panel">
        {#if tabSet === 0}
          <LoginForm />
        {:else if tabSet === 1}
          <SignUpForm />
        {:else if tabSet === 2}
          <span>TODO Guest Login</span>
        {/if}
      </svelte:fragment>
    </TabGroup>
  {/if}
</div>
