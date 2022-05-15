import BackgroundWrapper from "./BackgroundWrapper";
import { render } from "@testing-library/react";
test("Render", () => {
  const { getByTestId } = render(
    <BackgroundWrapper>
      <div data-testid="test-children">Hello</div>
    </BackgroundWrapper>
  );
  expect(getByTestId("test-children")).toBeInTheDocument();
});
