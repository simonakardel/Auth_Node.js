<script>
  import { navigate } from "svelte-navigator";
  import toastr from "toastr";
  import { BASE_URL } from "../stores/urlDomain.js";

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  let email = "";
  let password = "";
  let repeatPassword = "";

  async function handleSubmit() {
    if (password !== repeatPassword) {
      toastr.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        toastr.success("Account created successfully!");
        navigate("/login");
      } else {
        const errorMessage = await response.text();
        toastr.error(`Error: ${errorMessage}`);
      }
    } catch (error) {
      toastr.error(`Error: ${error.message}`);
    }
  }
</script>

<main>
  <div class="login-container">
    <div class="flex-column first">
      <h2>Create an account</h2>
      <p>Please enter your details.</p>
    </div>
    <form
      class="flex-column"
      on:submit|preventDefault={handleSubmit}
    >
      <div class="flex-column">
        <label
          for="email"
          class="input-label">Email</label
        >
        <input
          type="email"
          name="email"
          required
          class="login-input"
          placeholder="example@gmail.com"
          bind:value={email}
        />
      </div>
      <div class="flex-column">
        <label
          for="password"
          class="input-label">Password</label
        >
        <input
          type="password"
          name="password"
          required
          class="login-input"
          bind:value={password}
        />
      </div>
      <div class="flex-column">
        <label
          for="repeat-pass"
          class="input-label">Repeat password</label
        >
        <input
          type="password"
          name="repeat-pass"
          required
          class="login-input"
          bind:value={repeatPassword}
        />
      </div>
      <button
        type="submit"
        class="login-btn btn">Sign up</button
      >
      <p class="small-p">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </form>
  </div>
</main>

<style>
  .login-container {
    margin-top: 10vh;
    height: 500px;
    width: 450px;
    padding: 20px;
    background: linear-gradient(
      108.27deg,
      rgba(255, 255, 255, 0.1) 3.59%,
      rgba(255, 255, 255, 0.2) 50.72%
    );
    box-shadow: 40px 20px 4px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(15px);
    border-radius: 30px;
  }

  h2,
  p {
    margin: 0;
  }

  h2 {
    font-weight: 300;
    text-transform: uppercase;
    font-size: 2.2rem;
  }

  .first {
    margin: 30px 0;
  }

  .login-btn {
    width: 360px;
    height: 44px;
    margin: 10px 0;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 8px;
  }

  .login-input {
    width: 360px;
  }

  .input-label {
    align-self: flex-start;
  }

  p {
    font-weight: 500;
    font-size: 18px;
  }

  .small-p {
    font-size: 14px;
    font-weight: 600;
  }

  .small-p a {
    cursor: pointer;
  }

  a {
    font-size: 1rem;
  }
</style>
