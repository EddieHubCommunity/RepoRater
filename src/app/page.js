"use client";

import { useEffect, useState, Fragment } from "react";

import SideNav from "@/components/SideNav";
import Repos from "@/components/Repos";
import Activity from "@/components/Activity";
import Stats from "@/components/Stats";
import Toast from "@/components/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utils/classNames";

export const dynamic = "force-dynamic";

const sortOptions = [
  { name: "Highest rated", value: "rated" },
  { name: "Most popular", value: "popular" },
];

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const alert = params.get("alert");
  const message = params.get("message");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(sortOptions[0].value);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setShowAlert(false);
        // Removed alert because it can re-render the Toast Component
        router.push("/", { scroll: false });
      }, 4000);
    }
  }, [alert]);

  return (
    <>
      <SideNav setKeyword={setKeyword}>
        <>
          <main className="lg:pr-96">
            <Stats />
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-white">
                Repositories
              </h1>

              {/* Sort dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                  Sort by
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {sortOptions.map((item) => (
                      <Menu.Item key={item.value}>
                        <span
                          onClick={() => setSort(item.value)}
                          className={classNames([
                            sort === item.value ? "bg-gray-200" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer",
                          ])}
                        >
                          {item.name}
                        </span>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </header>

            <Repos keyword={keyword} minimumVotes={0} sort={sort} />
          </main>

          <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <Activity />
          </aside>
        </>
      </SideNav>
      {showAlert && <Toast type={alert} message={message} />}
    </>
  );
}
