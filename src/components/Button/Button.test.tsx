import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("Test onClick", async () => {
  const onClickFunction = jest.fn();
  const { getByTestId } = render(
    <Button id="btn-test" text="Button Test" onClick={onClickFunction} />
  );
  const button = getByTestId("btn-test");
  await userEvent.click(button);
  expect(onClickFunction).toHaveBeenCalled();
  expect(button).toHaveTextContent("Button Test");
});
