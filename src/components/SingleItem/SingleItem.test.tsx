import { render } from "@testing-library/react";
import { StoryType } from "src/pages/Home/interface";
import SingleItem from "./SingleItem";

const mockStoryComplete: StoryType = {
  by: "devchandan",
  descendants: 10,
  id: 31387302,
  kids: [31387542],
  score: 7,
  text: "As a non-US resident(Indian Nationals) what is the best option to register a company and start accepting payments from US clients?<p>It seems like Firstbase is cheaper and faster.<p>Stripe Atlas seems like an established option but seems to have hidden costs?",
  time: 1652619738,
  title:
    "Ask HN: Firstbase vs. Stripe Atlas vs. Others- Which is better in 2022?",
  type: "story",
  url: "https://shkspr.mobi/blog/2018/11/who-owns-the-copyright-to-my-medical-images/",
};

const mockStoryWithoutUrl: StoryType = {
  by: "devchandan",
  descendants: 0,
  id: 31387302,
  kids: [31387542],
  score: 7,
  text: "As a non-US resident(Indian Nationals) what is the best option to register a company and start accepting payments from US clients?<p>It seems like Firstbase is cheaper and faster.<p>Stripe Atlas seems like an established option but seems to have hidden costs?",
  time: 1652619738,
  title:
    "Ask HN: Firstbase vs. Stripe Atlas vs. Others- Which is better in 2022?",
  type: "story",
};

const mockStoryWithoutTitle: StoryType = {
  by: "devchandan",
  descendants: 0,
  id: 31387302,
  kids: [31387542],
  score: 7,
  text: "As a non-US resident(Indian Nationals) what is the best option to register a company and start accepting payments from US clients?<p>It seems like Firstbase is cheaper and faster.<p>Stripe Atlas seems like an established option but seems to have hidden costs?",
  time: 1652619738,
  type: "story",
};
const mockStoryWithoutCreator: StoryType = {
  descendants: 0,
  id: 31387302,
  title: "Title",
  kids: [31387542],
  score: 7,
  text: "As a non-US resident(Indian Nationals) what is the best option to register a company and start accepting payments from US clients?<p>It seems like Firstbase is cheaper and faster.<p>Stripe Atlas seems like an established option but seems to have hidden costs?",
  time: 1652619738,
  type: "story",
};

test("Render Normal", () => {
  const { getByTestId } = render(<SingleItem d={mockStoryComplete} />);
  const title = getByTestId("txt-title-31387302");
  expect(title).toHaveTextContent(
    "Ask HN: Firstbase vs. Stripe Atlas vs. Others- Which is better in 2022?"
  );
  const creator = getByTestId("txt-creator-31387302");
  expect(creator).toHaveTextContent("devchandan");
  const link = getByTestId("link-31387302");
  expect(link).toBeInTheDocument();
});

test("Render Empty Data", () => {
  const { queryByTestId } = render(<SingleItem />);
  const title = queryByTestId("txt-title-31387302");
  expect(title).not.toBeInTheDocument();
});

test("Render Without Url", () => {
  const { queryByTestId } = render(<SingleItem d={mockStoryWithoutUrl} />);
  const title = queryByTestId("txt-title-31387302");
  expect(title).toBeInTheDocument();
  const link = queryByTestId("link-31387302");
  expect(link).not.toBeInTheDocument();
});

test("Render Without Title", () => {
  const { queryByTestId } = render(<SingleItem d={mockStoryWithoutTitle} />);
  const title = queryByTestId("txt-title-31387302");
  expect(title).not.toBeInTheDocument();
  const text = queryByTestId("txt-text-31387302");
  expect(text).toBeInTheDocument();
});

test("Render Without Creator", () => {
  const { queryByTestId } = render(<SingleItem d={mockStoryWithoutCreator} />);
  const title = queryByTestId("txt-title-31387302");
  expect(title).toBeInTheDocument();
  const creator = queryByTestId("txt-creator-31387302");
  expect(creator).toHaveTextContent("");
});
