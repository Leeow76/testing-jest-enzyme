import CounterList from "./components/CounterList/CounterList";
import User from "./components/User/User";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CounterList />
      <User id="1" />
    </div>
  );
}

export default App;
