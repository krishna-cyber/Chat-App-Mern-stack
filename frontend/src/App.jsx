import { useContext, useEffect } from "react";
import Logger from "./Logger";
import server from "../utils/server";
import { userContext } from "./userContext";

function App() {
  const { user, setUser, id, setId } = useContext(userContext);

  //function for fetching data from backend
  const fetchdata = async () => {
    await server
      .get("/profile")
      .then((res) => {
        setUser(res.data.username);
        setId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <Logger />
    </>
  );
}

export default App;
