import { render } from "@testing-library/react";
import Loading from "./Loading";

test("Render", () => {
  const { getByTestId } = render(<Loading />);
  const loader = getByTestId("loader");
  expect(loader).toBeInTheDocument();
});
