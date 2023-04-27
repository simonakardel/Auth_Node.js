<script>
    import Button from "../components/Button.svelte";
</script>


<h1>EXPLORE THE UNIVERSE OF SPACE NEWS</h1>
<p>Stay Updated on Space News and Exploration!</p>
<div class="flex">
    <Button path="/signup" text="Sign up" className="transparent"/>
    <Button path="/login" text="Login" className="transparent"/>
</div>

<style>
    .flex {
        display: flex;
        justify-content: center;
    }

    h1 {
        margin-top: 20vh;
        font-size: 82px;
        font-weight: 300;
    }

    p {
        font-size: 32px;
        font-weight: 400;
    }
    
</style>