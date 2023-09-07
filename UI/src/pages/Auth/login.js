import React from "react";
import getGoogleOAuthUrl from "utils/googleOAuthUrl";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <a href={getGoogleOAuthUrl()}>Login with google</a>
    </div>
  );
};

export default Login;
