<script>

    import Button from "../components/Button.svelte";
    import toastr from "toastr";
    import { navigate } from "svelte-navigator";
    import { user } from "../stores/user";

  
  
  async function handleLogout() {
  try {
    const response = await fetch("http://localhost:8080/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    if (response.ok) {
      // deleting access token from local storage
      localStorage.removeItem("accessToken");

      // resetting the user
      user.set(null);

      toastr.success("Successfully logged out");
      navigate("/");
    } else {
      const errorMessage = await response.text();
      toastr.error(`Error: ${errorMessage}`);
    }
  } catch (error) {
    toastr.error(`Error: ${error.message}`, "this is the second error");
  }
}


  
  
  </script>
  
  <div class="button-group">
      <Button path="/contact" text="Contact" className="orange"/>
      <button on:click={handleLogout} class="btn logout-btn">Logout</button>
  </div>


  <style>
    .button-group {
        display: flex;
        position: absolute;
        right: 30px;
        top: 30px;
        align-items: center;
    }

    .logout-btn {
        font-size: 1.25rem;
        font-weight: 600;
        height: 50px;
    }

  </style>