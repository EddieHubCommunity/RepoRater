import { classNames } from "@/utils/classNames";

export default function Alert({ type = "success", message }) {
  const labels = {
    success: "Success",
    error: "Error",
  };

  return (
    <div
      role="alert"
      className={classNames([
        "alert shadow-lg",
        type === "success" && "alert-success",
        type === "error" && "alert-error",
      ])}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 className="font-bold">{labels[type]}</h3>
        <div className="text-xs">{message}</div>
      </div>
      {/* <button className="btn btn-sm" onClick={() => onClick(false)}>
        Close
      </button> */}
    </div>
  );
}
