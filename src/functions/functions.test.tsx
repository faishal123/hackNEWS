import { render, act } from "@testing-library/react";
import { testWait } from "./testWait";
import userEvent from "@testing-library/user-event";
import { useDebounce } from "./useDebounce";
import { isObjectEmpty } from "./object";
import { useState } from "react";

const ComponentNumber = () => {
  const [number, setNumber] = useState(0);
  const debouncedNumber = useDebounce(number, 100);

  return (
    <div>
      <button
        data-testid="test-button"
        onClick={() => {
          setNumber(1);
        }}
      ></button>
      <div data-testid="test-data">{debouncedNumber}</div>
    </div>
  );
};

const ComponentString = () => {
  const [text, setText] = useState("Halo");
  const debouncedText = useDebounce(text, 100);

  return (
    <div>
      <button
        data-testid="test-button"
        onClick={() => {
          setText("TestSatu");
        }}
      ></button>
      <div data-testid="test-data">{debouncedText}</div>
    </div>
  );
};

test("Test Debounce Number", async () => {
  await act(async () => {
    const { getByTestId } = render(<ComponentNumber />);
    const text = getByTestId("test-data");
    const button = getByTestId("test-button");
    await userEvent.click(button);
    expect(text).toHaveTextContent("0");
    await testWait(101);
    expect(text).toHaveTextContent("1");
  });
});

test("Test Debounce String", async () => {
  await act(async () => {
    const { getByTestId } = render(<ComponentString />);
    const text = getByTestId("test-data");
    const button = getByTestId("test-button");
    await userEvent.click(button);
    expect(text).toHaveTextContent("halo");
    await testWait(101);
    expect(text).toHaveTextContent("testsatu");
  });
});

test("isObjectEmpty with empty object", () => {
  expect(isObjectEmpty()).toBeTruthy();
});

test("isObjectEmpty with not empty object", () => {
  expect(isObjectEmpty({ string: "Hello" })).toBeFalsy();
});
