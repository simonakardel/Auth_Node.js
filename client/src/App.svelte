<script>
  import { Router, Link, Route } from "svelte-navigator";

  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Home from "./pages/Home.svelte";
  import Contact from "./pages/Contact.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import TokenRefresher from "./components/TokenRefresher.svelte";
  import { user } from "./stores/user.js"

</script>

<TokenRefresher>
<Router>
  
    <div class="logo">
       <Link to={$user ? "/dashboard" : "/"}>
        <img src="/images/CClogo.svg" alt="cosmic-connection-logo">
      </Link>
    </div>


  <main>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/login">
      <Login/>
    </Route>
    <PrivateRoute path="/contact" let:location>
      <Contact/>
    </PrivateRoute>
    <PrivateRoute path="/dashboard" let:location>
      <Dashboard/>
    </PrivateRoute>
  </main>
</Router>
</TokenRefresher>

<style>
  .logo {
    position: absolute;
    top: 30px;
    left: 30px;
  }

  img {
    width: 200px;
  }
  

</style>