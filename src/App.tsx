import { getAuth } from "firebase/auth";
import { app } from "./utils/Firebase";

const App = () => {
  const auth = getAuth(app);
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Hello Twilio Hack</h2>
      <button
        onClick={() => {
          auth.signOut();
        }}
      >Sign Out</button>
    </div>
  );
};

export default App;
