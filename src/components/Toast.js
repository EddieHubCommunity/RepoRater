import { classNames } from "@/utils/classNames";

export default function Toast({ type = "info", message, repo }) {
  return (
    <div className="toast toast-end">
      <div
        className={classNames([
          "alert",
          type === "info" && "alert-info",
          type === "success" && "alert-success",
          type === "error" && "alert-error",
        ])}
      >
        <span className="text-black font-semibold">
          {message}
          <span className="text-white">{repo}</span>
        </span>
      </div>
    </div>
  );
}
