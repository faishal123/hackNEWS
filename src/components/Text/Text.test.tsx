import { render } from "@testing-library/react";
import Text from "./Text";

test("Render Default Props", () => {
  const { getByTestId } = render(<Text id="txt-test">Test Text</Text>);
  const text = getByTestId("txt-test");
  expect(text.className?.includes("color-white")).toBeTruthy();
  expect(text.className?.includes("display-inline")).toBeTruthy();
  expect(text.className?.includes("variant-regular")).toBeTruthy();
  expect(text.className?.includes("size-medium")).toBeTruthy();
  expect(text).toHaveTextContent("Test Text");
});

test("Render Block", () => {
  const { getByTestId } = render(
    <Text block id="txt-test">
      Test Text
    </Text>
  );
  const text = getByTestId("txt-test");
  expect(text.className?.includes("color-white")).toBeTruthy();
  expect(text.className?.includes("display-block")).toBeTruthy();
  expect(text.className?.includes("variant-regular")).toBeTruthy();
  expect(text.className?.includes("size-medium")).toBeTruthy();
  expect(text).toHaveTextContent("Test Text");
});
