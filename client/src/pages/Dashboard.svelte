<script>
  import ButtonGroup from "../components/ButtonGroup.svelte";
  import SpaceNews from "../components/SpaceNews.svelte";

</script>


<ButtonGroup/>
<div class="container">
    <h2>Welcome to space news</h2>
    <SpaceNews/>
</div>


<style>
    .container {
        background: white;
        max-width: 800px;
        min-height: 100vh;
        padding: 60px;
        margin-top: 120px;
        border-radius: 15px;
    }

    h2 {
        color: black;
        margin: 0;
        font-size: 48px;
        padding-bottom: 90px;
    }

</style>
