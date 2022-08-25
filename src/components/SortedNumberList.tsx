import { styled } from "@stitches/react";
import { SortedNumber } from "./SortedNumber";

interface SortedNumberListProps {
  numbers: string[];
}

const Wrapper = styled("div", {
  display: "grid",
  alignItems: "center",
  height: "auto",
  justifyContent: "center",
  columnGap: "50px",
  width: "100%",
  justifyItems: "center",
  gridTemplateColumns: "repeat(6, 35px)",
  overflow: "scroll",
  gap: "5rem",
  padding: "15px 50px",
  rowGap: "20px",
  "@media only screen and (max-width: 1244px)": {
    gridTemplateColumns: "repeat(4, 35px)",
    maxHeight: "70%",
  },
  "@media only screen and (max-width: 1023px)": {
    gridTemplateColumns: "repeat(6, 35px)",
    maxHeight: "70%",
  },
  "@media only screen and (max-width: 872px)": {
    gridTemplateColumns: "repeat(4, 30px)",
    gap: "3.5rem",
    padding: 0,
    maxHeight: "50%",
    rowGap: "20px",
  },
  "@media only screen and (max-width: 384px)": {
    gridTemplateColumns: "repeat(4, 30px)",
    gap: "3.5rem",
    padding: 0,
    maxHeight: "45%",
    rowGap: "20px",
  },
});

export const SortedNumberList = ({ numbers }: SortedNumberListProps) => {
  return (
    <Wrapper>
      {numbers &&
        numbers.map((number) => <SortedNumber key={number} number={number} />)}
    </Wrapper>
  );
};
