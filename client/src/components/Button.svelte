<script>
    import { Link } from "svelte-navigator";
    export let path;
    export let text;
    export let className;
</script>

<div class="button {className}" >
    <Link to={path}>{text}</Link>
</div>


<style>
    .button {
        padding: 10px 20px;
        margin: 10px;
        height: 30px;
        max-width: 100px;
        border-radius: 10px;
        box-shadow: 40px 20px 4px rgba(0, 0, 0, 0.05);
    }

    .button:hover{
        border: 2px solid white;
    }

    .transparent {
        background: transparent;
        background: linear-gradient(108.27deg, rgba(255, 255, 255, 0.6) 3.59%, rgba(255, 255, 255, 0.3) 50.72%);
        backdrop-filter: blur(15px);

    }

    .orange {
        background: orange;
    }


</style>