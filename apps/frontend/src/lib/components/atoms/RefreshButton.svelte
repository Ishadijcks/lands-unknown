<script lang="ts">
  export let message: string;
  const refresh = () => {
    window.location.reload();
  };
</script>

<button class="button variant-filled-primary" on:click={refresh}>{message}</button>
