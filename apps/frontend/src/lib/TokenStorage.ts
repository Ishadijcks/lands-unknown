import type { Writable } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";

export const tokenStorage: Writable<{ userName: string; token: string } | null> = localStorageStore("token", null);
