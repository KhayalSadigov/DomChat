import { useState } from "react";
import styles from "./index.module.scss";
import Button from "@mui/material/Button";

function LogForm() {
  const [signMode, setSignMode] = useState(true);
  function handleMode() {
    setSignMode(!signMode);
  }

  return (
    <div className={styles.form}>
      <div className={styles.signin} style={signMode ? { left: "0" } : {}}>
        <div className={styles.title}>
          <h1>Login your account</h1>
          <p>
            Don't have an account? <span onClick={handleMode}>Sign up</span>
          </p>
        </div>
        <form className={styles}>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Button variant="contained" type="submit">Login</Button>
        </form>
        <div className={styles.footer}>
          <p>By click Create account you agree to Recognotes</p>
          <p>
            <span>Terms of use</span> and <span>Privacy policy</span>
          </p>
        </div>
      </div>

      <div className={styles.signup} style={signMode ? { left: "100%" } : {}}>
        <div className={styles.title}>
          <h1>Create an account</h1>
          <p>
            Already have an acoount? <span onClick={handleMode}>Login</span>
          </p>
        </div>
        <form className={styles}>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <Button variant="contained" type="submit">Sign up</Button>
        </form>
        <div className={styles.footer}>
          <p>By click Create account you agree to Recognotes</p>
          <p>
            <span>Terms of use</span> and <span>Privacy policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogForm;
