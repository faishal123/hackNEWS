import { render } from "@testing-library/react";
import Text from "./Text";

test("Render", () => {
  render(<Text id="txt-test">asdf</Text>);
});
