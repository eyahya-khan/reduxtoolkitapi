import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../hooks";
import { fetchPost } from "../store/index";
import TablePagination, {
  LabelDisplayedRowsArgs,
} from "@mui/material/TablePagination";

const PostListTablePagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.displayPost.title);
  const isLoading = useSelector(
    (state: RootState) => state.displayPost.isLoading
  );
  const error = useSelector((state: RootState) => state.displayPost.error);
  // search
  const [searchTitle, setSearchTitle] = useState("");
  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const visitedPost = page * rowsPerPage;

  const displayPost = posts
    .slice(visitedPost, visitedPost + rowsPerPage)
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const defaultLabelDisplayedRows: React.FC<LabelDisplayedRowsArgs> = (
    props
  ): React.ReactElement<any, any> => {
    return (
      <>
        <div className="paginationDisplay">
          <p>{`${props.from}-${props.to} of ${props.count} orders`}</p>
          <p>{`${props.page + 1} of ${props.count / rowsPerPage} pages`}</p>
        </div>
      </>
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    <>
      <h2>Post List</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {displayPost}
      <TablePagination
        count={posts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Item per page"}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelDisplayedRows={({ from, to, count, page }) => {
          return defaultLabelDisplayedRows({ from, to, count, page });
        }}
      />
    </>
  );
};

export default PostListTablePagination;
