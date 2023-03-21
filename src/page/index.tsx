import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../hooks";
import { fetchPost } from "../store/index";
// import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.displayPost.title);
  const isLoading = useSelector(
    (state: RootState) => state.displayPost.isLoading
  );
  const error = useSelector((state: RootState) => state.displayPost.error);
  // search
  const [searchTitle, setSearchTitle] = useState("");
  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 8;
  const visitedPost = pageNumber * postPerPage;
  const displayPost = posts
    .slice(visitedPost, visitedPost + postPerPage)
    //search
    // eslint-disable-next-line array-callback-return
    .filter((value) => {
      if (searchTitle === "") {
        return value;
      } else if (
        value.title.toLowerCase().includes(searchTitle.toLowerCase())
      ) {
        return value;
      }
    })
    .map((post) => <li key={post.title}>{post.title}</li>);

  const countPage = Math.ceil(posts.length / postPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value - 1);
  };

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Stack className="App">
      <h2>Post List</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {displayPost}
      <Pagination
        count={countPage}
        page={pageNumber + 1}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Stack>
  );
};

export default PostList;
