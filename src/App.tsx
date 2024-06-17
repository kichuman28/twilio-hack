import { getAuth } from "firebase/auth";
import { app } from "./utils/Firebase";
import BottomBar from "./components/BottomBar";

const App = () => {
  const auth = getAuth(app);
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Hello Twilio Hack</h2>
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign Out
      </button>
      <BottomBar />
    </div>
  );
};

export default App;
