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
        <span className="font-bold">
          {message.slice(0, 18)}
          <span className="text-white ">{message.slice(18)}</span>
        </span>
      </div>
    </div>
  );
}
