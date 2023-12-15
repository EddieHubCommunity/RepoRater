"use client";

import action from "./action";

export default function Form() {
  return (
    <form action={action} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">URL</span>
        </label>
        <input
          name="url"
          id="url"
          type="url"
          placeholder="GitHub Repo URL"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">DX Rating</span>
        </label>
        <div className="rating rating-lg">
          <input
            type="radio"
            name="rating"
            value="1"
            className="mask mask-star-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating"
            value="2"
            className="mask mask-star-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating"
            value="3"
            className="mask mask-star-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating"
            value="4"
            className="mask mask-star-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating"
            value="5"
            className="mask mask-star-2 bg-green-500"
          />
        </div>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Rate!</button>
      </div>
    </form>
  );
}
