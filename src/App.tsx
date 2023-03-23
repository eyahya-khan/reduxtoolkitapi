import { Provider } from "react-redux";
import { store } from "./hooks";
import "./App.css";
// import PostList from "./page";
import PostListTablePagination from "./page/PostlistTablePagination";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <PostList /> */}
        <PostListTablePagination />
      </Provider>
    </div>
  );
};

export default App;
