import { useDispatch, useSelector } from "react-redux";

function Loginpage() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);


  console.log(settings.theme);
  console.log(settings.lang);
  return <div>Loginpage</div>;
}

export default Loginpage;
