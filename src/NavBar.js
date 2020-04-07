import React, { useState } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import colors from "./Colors";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const NavBar = () => {
  const [padding] = useState(15);
  return (
    <header
      css={css`
        background-color: ${colors.secondary};
        padding: ${padding}px;
        position: sticky;
        top: 0;
        z-index: 10;
      `}
    >
      <Link to="/">Adopt Me!</Link>
      <span
        css={css`
          font-size: 60px;
          display: inline-block;
          animation: 1s ${spin} linear infinite;
          &:hover {
            animation: 1s ${spin} linear reverse;
            text-decoration: underline;
          }
        `}
        aria-label="logo"
        role="img"
      >
        🐩
      </span>
    </header>
  );
};

export default NavBar;
