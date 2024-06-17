import BottomBar from "./components/BottomBar";
import ComponentCard from "./components/CommunityCard";

const App = () => {
  return (
    <div>
      <div className="Feed mx-auto md:max-w-[30%] px-6 py-4 mb-8">
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
      </div>
      <BottomBar />
    </div>
  );
};

export default App;
