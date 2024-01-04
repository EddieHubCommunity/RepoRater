import { classNames } from "@/utils/classNames";

export default function Toast({ type = "info", message }) {
  return (
    <div className="toast toast-end">
      <div
        className={classNames([
          "alert",
          type === "info" && "alert-info",
          type === "success" && "alert-success",
        ])}
      >
        <span>{message}</span>
      </div>
    </div>
  );
}
