<script>
  import LoginDisplay from "$lib/components/login/LoginDisplay.svelte";
</script>

<div class="flex flex-row h-16 p-4">Lands Unknown</div>

<div class="flex flex-col items-center">
  <div class="flex flex-col w-2/3 space-y-24">
    <div class="flex flex-row w-full justify-between">
      <div class="flex flex-col">
        <span class="h1">Lands Unknown</span>
        <span>Explore the world of Lands Unknown where every adventurer can leave their mark</span>
      </div>

      <LoginDisplay />
    </div>

    <div class="flex flex-row card p-4">
      <span class="flex-grow text-center">IMG</span>
      <div class="flex flex-col w-64">
        <span class="h2">Over 10 skills to enjoy</span>
        <span>Mining, Smithing, Woodcutting, Archeology, Divination and many more!</span>
      </div>
    </div>

    <div class="flex flex-row card p-4">
      <div class="flex flex-col w-64">
        <span class="h2">Create your own gear for combat</span>
        <span>gather resources and create your own equipment to rid the world of evil creatures!</span>
      </div>
      <span class="flex-grow text-center">IMG</span>
    </div>

    <div class="flex flex-row card p-4">
      <span class="flex-grow text-center">IMG</span>
      <div class="flex flex-col w-64">
        <span class="h2">Immersive Quests</span>
        <span>Uncover the mysteries of the world through story-based quests</span>
      </div>
    </div>

    <div class="flex flex-row card p-4">
      <div class="flex flex-col w-64">
        <span class="h2">Join the Community</span>
        <span
          >Chat with your friends, compete for leaderboards and cooperate to uncover the mysteries of the Lands Unknown</span
        >
      </div>
      <span class="flex-grow text-center">IMG</span>
    </div>
  </div>
</div>
