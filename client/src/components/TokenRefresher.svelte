<script>
    import { onMount, onDestroy } from "svelte";
    import { scheduleTokenRefresh } from "../utils/refreshTokens.js";
  
    let unsubscribe;
  
    onMount(() => {
      unsubscribe = scheduleTokenRefresh();
    });
  
    onDestroy(() => {
      unsubscribe();
    });
  </script>
  
  <slot/>