<script>

    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import ButtonGroup from "../components/ButtonGroup.svelte";

    let firstName = "";
    let lastName = "";
    let email = "";
    let message = "";
    
    async function handleSubmit() {
        try {
      const response = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
        }),
      });

      if (response.ok) {
        toastr.success("Message sent successfully!");
        navigate("/"); 
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
  <ButtonGroup/>
  <div class="contact-container">
    <h2 class="heading">Send us a message</h2>
    <form
      class="contact-form"
      on:submit|preventDefault={handleSubmit}
    >
      <div class="flex-clmn">
        <label for="name">First Name</label>
        <input
          type="text"
          placeholder="Enter your first name"
          name="name"
          bind:value={firstName}
          required
        />
      </div>
      <div class="flex-clmn">
        <label for="surname">Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name"
          name="surname"
          bind:value={lastName}
          required
        />
      </div>
      <div class="flex-clmn">
        <label for="email">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          name="email"
          bind:value={email}
          required
        />
      </div>
      <div class="flex-clmn">
        <label for="message">Message</label>
        <textarea
          name="message"
          rows="10"
          bind:value={message}
        />
      </div>
      <button
        type="submit"
        class="submit-btn btn">Send</button
      >
    </form>
  </div>
</main>

<style>
  .contact-container {
    margin-top: 5vh;
    height: 550px;
    width: 450px;
    padding: 50px;
    background: linear-gradient(
      108.27deg,
      rgba(255, 255, 255, 0.1) 3.59%,
      rgba(255, 255, 255, 0.2) 50.72%
    );
    box-shadow: 40px 20px 4px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(15px);
    border-radius: 30px;
  }

  .heading {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 2rem;
    margin: 0;
    padding-bottom: 10px;
  }

  .contact-form {
    text-align: left;
    display: grid;
    align-items: center;
  }

  input {
    max-width: 100%;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    background: #ffffff;
    border: 1px solid #d0d5dd;
  }

  button {
    justify-self: right;
    width: 150px;
    height: 44px;
  }
</style>
