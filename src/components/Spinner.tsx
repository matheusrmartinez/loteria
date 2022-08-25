import { CSSProperties } from "react";
import { SyncLoader } from "react-spinners";

interface SpinnerProps {
  loading: boolean;
  color?: string;
  override?: CSSProperties;
}

export const Spinner = ({
  loading = false,
  color = "black",
  override,
}: SpinnerProps) => (
  <SyncLoader
    color={color}
    loading={loading}
    cssOverride={override}
    size={10}
  />
);
