import { CSSProperties } from "react";

type Props = {
  message: string;
  color?: string;
  style?: CSSProperties;
};

export function ContentPlaceholderMessage({ message, color, style }: Props) {
  return <div style={{ padding: "1rem", color, ...style }}>{message}</div>;
}
