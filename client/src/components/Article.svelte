<script>
  import Button from "./Button.svelte";

    export let title;

    export let articleLink;
 
  </script>

  <div class="article">
      <h2><a href="{articleLink}">{title}</a></h2>
    <a href="{articleLink}">Read more</a>
  </div>
  <hr>

  <style>

    .article {
        text-align: left;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }
    h2{
        color: black;
        max-width: 80%;
        margin: 0;
    }

    h2 a {
        font-size: 24px;
        color: black;
    }

    a {
        color: darkcyan;
        font-size: 14px;
    }

    hr {
        height:1px;
        border-width:0;
        color:lightgray;
        background-color:lightgrey;
        margin-bottom: 30px;

    }



  </style>