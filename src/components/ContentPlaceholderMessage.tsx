import type { CSSProperties } from "react";

type Props = {
  color?: string;
  message: string;
  style?: CSSProperties;
};

export function ContentPlaceholderMessage({ color, message, style }: Props) {
  return <div style={{ color, padding: "1rem", ...style }}>{message}</div>;
}
