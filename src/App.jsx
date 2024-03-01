import { useContext, useEffect, useState } from "react";
import LogIn from "./Components/LogInComponents/LogIn";
import Registration from "./Components/RegistrComponents/Registr";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import $api from "./http";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <>
      <div className="DivWButtons">
        <button className="Button1" onClick={() => setIsLogin((prev) => !prev)}>
          Log in
        </button>
        <button className="Button2" onClick={() => setIsReg((prev) => !prev)}>
          Registration
        </button>
        <button className="Button2" onClick={() => store.logout()}>
          Log out
        </button>
      </div>
      <h2>{store.isAuth ? `${store.user.email}` : "АВТОРИЗУЙТЕСЬ"}</h2>
      {isLogin && <LogIn setIsLogin={setIsLogin} />}
      {isReg && <Registration setIsReg={setIsReg} />}
    </>
  );
}

export default observer(App);
