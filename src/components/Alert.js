export default function Alert({ message }) {
  return (
    <div className="toast toast-top toast-start">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
}
