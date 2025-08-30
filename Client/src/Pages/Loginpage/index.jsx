import { useDispatch, useSelector } from "react-redux";
import LogForm from "../../Components/LogForm";
import LogInfo from "../../Components/LogInfo";
import styles from "./index.module.scss";

function Loginpage() {
  // const dispatch = useDispatch();
  // const settings = useSelector((state) => state.settings);

  return (
    <div className={styles.Loginpage}>
      <div className={styles.container}>
        <LogInfo />
        <LogForm />
      </div>
    </div>
  );
}

export default Loginpage;
