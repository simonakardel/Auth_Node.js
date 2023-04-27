<script>
  import { onMount } from "svelte";
  import Article from "./Article.svelte";
    let articles = [];

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:8080/fetch-articles');
      const result = await response.json();
      articles = articles.concat(result);
    } catch (error) {
      console.error(error);
    }
  });

  </script>
  

    <div>
        {#each articles as article}
        <Article
          title={article.title}
          articleLink={article.url}
        />
      {/each}
    </div>
   

    <style>
        div {
            color: black;
        }
    </style>
