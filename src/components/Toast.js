import { classNames } from "@/utils/classNames";

export default function Toast({ type = "info", message }) {
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
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
}
