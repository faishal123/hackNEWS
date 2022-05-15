import { render, act } from "@testing-library/react";
import Input from "./Input";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
const Component = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <Input
        id="txt-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div data-testid="test-value">{value}</div>
    </div>
  );
};

test("Render Input", async () => {
  await act(async () => {
    const { getByTestId } = render(<Component />);
    const input = getByTestId("txt-input");
    const valueText = getByTestId("test-value");
    await userEvent.type(input, "Test Value");
    expect(valueText).toHaveTextContent("Test Value");
  });
});
