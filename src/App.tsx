import { Provider } from "react-redux";
import { store } from "./hooks";
import "./App.css";
import PostList from "./page";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <PostList />
      </Provider>
    </div>
  );
};

export default App;
