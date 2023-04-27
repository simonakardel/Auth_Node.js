import { user } from '../stores/user';

export async function refreshAccessToken() {
    console.log("trying to refresh tokens")
    try {
      const response = await fetch("http://localhost:8080/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });
  
      if (response.ok) {
        const { accessToken } = await response.json();
        console.log("we got this new access token");
        localStorage.setItem("accessToken", accessToken);
  
        // Update the user store with the new access token
        user.update((currentUser) => {
          currentUser.accessToken = accessToken;
          return currentUser;
        });
        console.log("this is my access token", accessToken)
        return accessToken;
      } else {
        const errorMessage = await response.text();
        console.error(`Error: ${errorMessage}`);
        return null;
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }
  }
  
  export function scheduleTokenRefresh() {
    let timerId;
  
    const refreshTokenInterval = 10 * 60 * 1000; // 10 minutes
  
    user.subscribe(($user) => {
      if ($user && $user.accessToken) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          refreshAccessToken().then(() => {
            scheduleTokenRefresh();
          });
        }, refreshTokenInterval);
      }
    });
  
    return () => {
      clearTimeout(timerId);
    };
  }
  
  






  
  
  
  
  
  
  
  