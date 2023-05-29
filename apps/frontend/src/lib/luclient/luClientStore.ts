import { type Writable, writable } from "svelte/store";
import type { LuClient } from "$lib/luclient/LuClient";

export const luClientStore: Writable<LuClient> = writable();
