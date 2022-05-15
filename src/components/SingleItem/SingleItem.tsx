import React from "react";
import Link from "next/link";
import Text from "../Text";
import { isObjectEmpty } from "src/functions/object";
import { StoryType } from "src/pages/Home/interface";
import css from "./SingleItem.module.css";

export const parseHTML = (text: string | null, document: Document) => {
  const descriptionContainer = document.createElement("html");
  descriptionContainer.innerHTML = text || "";
  return descriptionContainer.innerText;
};

type SingleItemProps = {
  d?: StoryType;
};

const SingleItem: React.FC<SingleItemProps> = ({ d }) => {
  const dataEmpty = isObjectEmpty(d);
  const id = d?.id;
  const title = d?.title;
  const text = d?.text || "";
  const textParsed = !title ? parseHTML(text, document) : "";
  const url = d?.url;
  const urlExist = !!url;

  const renderContent = () => {
    if (dataEmpty) {
      return null;
    }
    return (
      <>
        <div className={css.singleStory}>
          <div className="margin--medium-b">
            {title ? (
              <Text id={`txt-title-${id}`} block size="large" variant="bold">
                {title}
              </Text>
            ) : (
              <Text id={`txt-text-${id}`} variant="medium" block size="medium">
                {textParsed || ""}
              </Text>
            )}
          </div>
          <Text id={`txt-creator-label-${id}`} size="small" variant="light">
            By:{" "}
          </Text>
          <Text id={`txt-creator-${id}`} size="small" variant="regular">
            {d.by || ""}
          </Text>
          {d.descendants ? (
            <>
              <Text id={`txt-separator-${id}`} size="small" variant="black">
                {" "}
                |{" "}
              </Text>
              <Text id={`txt-comments-${id}`} size="small" variant="regular">
                {`${d.descendants} `}
              </Text>
              <Text
                id={`txt-comments-label-${id}`}
                size="small"
                variant="light"
              >
                Comments
              </Text>
            </>
          ) : null}
        </div>
      </>
    );
  };

  if (!urlExist) {
    return <>{renderContent()}</>;
  }

  return (
    <Link key={d.id} passHref href={url}>
      <a data-testid={`link-${id}`} target={"_blank"}>
        {renderContent()}
      </a>
    </Link>
  );
};
export default SingleItem;
