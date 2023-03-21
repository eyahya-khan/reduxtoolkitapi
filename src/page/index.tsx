import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../hooks";
import { fetchPost } from "../store/index";
import ReactPaginate from "react-paginate";

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
  const postPerPage = 10;
  const visitedPost = pageNumber * postPerPage;
  const displayPost = posts
    .slice(visitedPost, visitedPost + postPerPage)
    //search
    .filter((value) => {
      if (searchTitle === "") {
        return value;
      } else if (
        value.title.toLowerCase().includes(searchTitle.toLowerCase())
      ) {
        return value;
      }
    })
    .map((post) => <li>{post.title}</li>);

  const countPage = Math.ceil(posts.length / postPerPage);
  const ChangePage = ({ selected }: any) => {
    setPageNumber(selected);
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
    <div className="App">
      <h2>Post List</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {displayPost}
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={countPage}
        onPageChange={ChangePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationAcive"}
      />
    </div>
  );
};

export default PostList;
