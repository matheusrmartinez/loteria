import { styled } from "@stitches/react";
import { ScaleLoader } from "react-spinners";

interface SortedNumberProps {
  number: string;
}

export const Wrapper = styled("style", {
  width: "100px",
  height: "100px",
  backgroundColor: "#ffffff",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  borderRadius: "50px",
  transition: "0.5s all ease-in-out",

  "@media only screen and (max-width: 872px)": {
    width: "76px",
    height: "76px",
    borderRadius: "38px",
  },

  ":hover": {
    backgroundColor: "rgba(255, 255, 255)",
    transform: "scale(1.5)",
  },
});

export const StyledParagraph = styled("div", {
  fontSize: "27px",
  fontFamily: "Montserrat",
  "@media only screen and (max-width: 872px)": {
    fontSize: "20px",
  },
});

export const SortedNumber = ({ number }: SortedNumberProps) => (
  <div>
    <Wrapper>
      <StyledParagraph>{number}</StyledParagraph>
    </Wrapper>
  </div>
);
