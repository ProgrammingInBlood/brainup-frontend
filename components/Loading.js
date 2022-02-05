import { SpinnerCircular } from "spinners-react";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <SpinnerCircular size={40} color={"#00a550"} secondaryColor={"#b2b2b2"} />
    </div>
  );
}

export default Loading;
