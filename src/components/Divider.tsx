import { useMemo } from "react";
import type { CSSProperties } from "react";

type Props = {
  height?: string;
  style?: CSSProperties;
};

export function Divider({ height = ".75rem", style: styleParent }: Props) {
  const style = useMemo(() => {
    const styleOverrideable = {
      background: "var(--ion-color-light)",
      height,
    };

    return { ...styleOverrideable, ...styleParent };
  }, [height, styleParent]);

  return <div style={{ ...style }} />;
}
