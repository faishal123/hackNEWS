import { render } from "@testing-library/react";
import LoaderCircle from "./LoaderCircle";

test("Render Default Props", () => {
  const { getByTestId } = render(<LoaderCircle id="loader" />);
  const loader = getByTestId("loader");
  expect(loader).toBeInTheDocument();
});
