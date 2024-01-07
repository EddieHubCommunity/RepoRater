"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import { account } from "@/config/appwrite-client";

export default function Form({ name = "", owner = "" }) {
  const [sending, setSending] = useState(false);
  const [rating, setRating] = useState(5);

  async function save(formData) {
    let user;
    let jwt;
    try {
      user = await account.getSession("current");
      jwt = await account.createJWT();
    } catch (e) {
      console.error(e);
      return redirect("/?alert=error&message=Invalid Session");
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
      setSending(false);
      redirect("/?alert=success&message=Rating saved!");
    }

    if (data.error) {
      setSending(false);
      alert("Error saving rating!");
    }
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Community Open Source Ratings!
        </h2>
        <p className="mt-10 text-center text-gray-400">
          Open Source is about collaboration and sharing knowledge. But some
          repos have a better DX (Developer Experience), share your experience
          with the community!
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form
          action={save}
          onSubmit={() => setSending(true)}
          className="card-body"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              GitHub Repo URL
            </label>
            <div className="mt-2">
              <input
                name="url"
                id="url"
                type="url"
                value={owner && name && `https://github.com/${owner}/${name}`}
                placeholder="URL"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Developer Experience (DX) Rating
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  More info
                </a>
              </div> */}
            </div>
            <div className="mt-2 flex flex-row items-center gap-2">
              <div className="rating rating-lg">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  className="mask mask-star-2 bg-green-500"
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  className="mask mask-star-2 bg-green-500"
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  className="mask mask-star-2 bg-green-500"
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  className="mask mask-star-2 bg-green-500"
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  className="mask mask-star-2 bg-green-500"
                  onChange={(e) => setRating(e.target.value)}
                  defaultChecked
                />
              </div>
              <div className="text-3xl">({rating})</div>
            </div>
          </div>

          <div>
            {!sending && (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add
              </button>
            )}
            {sending && (
              <span className="loading loading-dots loading-lg"></span>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Rating the same repo more than once will overwrite your previous
          rating
        </p>
      </div>
    </>
  );
}
