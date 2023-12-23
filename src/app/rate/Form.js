"use client";

import { redirect } from "next/navigation";

import { account } from "@/config/appwrite-client";

export default function Form() {
  async function save(formData) {
    let user;
    let jwt;
    try {
      user = await account.getSession("current");
      jwt = await account.createJWT();
    } catch (e) {
      console.error(e);
      return redirect("/auth/login");
    }
    const res = await fetch("/api/rate", {
      method: "POST",
      body: JSON.stringify({
        url: formData.get("url"),
        rating: formData.get("rating"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt.jwt,
        SessionID: user.$id,
      },
    });
    const data = await res.json();

    if (data.success) {
      redirect("/?alert=success&message=Rating saved!");
    }

    if (data.error) {
      alert("Error saving rating!");
    }
  }

  return (
    <form action={save} className="card-body">
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
            defaultChecked
          />
        </div>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Rate!</button>
      </div>
    </form>
  );
}
