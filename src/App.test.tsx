import { render, screen } from "@testing-library/react";
import PostList from "./page";

test("renders learn react link", () => {
  render(<PostList />);
  const linkElement = screen.getByText(/Post List/i);
  expect(linkElement).toBeInTheDocument();
});
