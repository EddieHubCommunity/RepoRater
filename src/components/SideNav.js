"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, Fragment, useEffect, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  FolderIcon,
  ServerIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { classNames } from "@/utils/classNames";
import Logo from "@/assets/repo-rater-logo.svg";
import GitHub from "@/assets/github-mark.svg";
import { account } from "@/config/appwrite-client";
import getUser from "@/utils/github/getUser";
import { usePathname } from "next/navigation";

export default function SideNav({ setKeyword, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathName = usePathname();

  const login = async () => {
    account.createOAuth2Session(
      "github",
      `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/`
    );
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const getAppwriteUser = async () => {
    try {
      const user = await account.getSession("current");
      let githubUser = {};
      if (user) {
        githubUser = await getUser(user.providerAccessToken);
      }
      setUser(githubUser);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAppwriteUser();
  }, []);

  const navigation = [
    {
      name: "GitHub Repos",
      href: "/",
      icon: FolderIcon,
      current: pathName === "/",
    },
    {
      name: "Popular Repos",
      href: "/popular",
      icon: ServerIcon,
      current: pathName === "/popular",
    },
    {
      name: "User Rankings",
      href: "/rankings",
      icon: ChartBarSquareIcon,
      current: pathName === "/rankings",
    },
    {
      name: "Star us on GitHub",
      href: "https://github.com/EddieHubCommunity/RepoRater",
      icon: StarIcon,
      current: false,
      external: true,
      css: "text-yellow-400",
    },
  ];

  const secure = [
    {
      id: 1,
      name: "Add Rating",
      href: "/rate",
      initial: "+",
      current: pathName === "/rate",
    },
    // {
    //   id: 2,
    //   name: "Your Ratings",
    //   href: "/account/ratings",
    //   initial: "S",
    //   current: pathName === "/account/ratings",
    // },
    // {
    //   id: 3,
    //   name: "Your Repos",
    //   href: "/account/repos",
    //   initial: "R",
    //   current: pathName === "/account/repos",
    // },
    {
      id: 4,
      name: "Logout",
      href: "/",
      onClick: logout,
      initial: "L",
      current: false,
    },
  ];

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 xl:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      className="h-8 w-auto"
                      src={Logo}
                      alt="GitHub RepoRater"
                      width={8}
                      height={8}
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                target={item.external ? "_blank" : "_self"}
                                className={classNames([
                                  item.current
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                  item.css && item.css,
                                ])}
                              >
                                <item.icon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {user && (
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Secure
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {secure.map((team) => (
                              <li key={team.name}>
                                <Link
                                  href={team.href}
                                  onClick={team.onClick}
                                  className={classNames([
                                    team.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer",
                                  ])}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                      {!user && (
                        <li className="-mx-6 mt-auto">
                          <Link
                            href="#"
                            onClick={login}
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <Image
                              className="h-8 w-8 rounded-full"
                              src={GitHub}
                              alt="GitHub OAuth Login"
                              width={8}
                              height={8}
                            />
                            <span>Login</span>
                          </Link>
                        </li>
                      )}
                      {user && (
                        <li className="-mx-6 mt-auto">
                          <span className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white">
                            <Image
                              className="h-8 w-8 rounded-full"
                              src={user.avatar_url}
                              alt="GitHub OAuth Login"
                              width={64}
                              height={64}
                            />
                            <span>{user.name}</span>
                          </span>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          <div className="flex h-16 shrink-0 items-center">
            <Image
              className="h-8 w-auto"
              src={Logo}
              alt="GitHub RepoRater"
              width={8}
              height={8}
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : "_self"}
                        className={classNames([
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                          item.css && item.css,
                        ])}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {user && (
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Secure
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {secure.map((team) => (
                      <li key={team.name}>
                        <Link
                          href={team.href}
                          onClick={team.onClick}
                          className={classNames([
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer",
                          ])}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
              {!user && (
                <li className="-mx-6 mt-auto">
                  <Link
                    href="#"
                    onClick={login}
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={GitHub}
                      alt="GitHub OAuth Login"
                      width={8}
                      height={8}
                    />
                    <span>Login</span>
                  </Link>
                </li>
              )}
              {user && (
                <li className="-mx-6 mt-auto">
                  <span className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white">
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={user.avatar_url}
                      alt="GitHub OAuth Login"
                      width={64}
                      height={64}
                    />
                    <span>{user.name}</span>
                  </span>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      <div className="xl:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-white xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="flex flex-1" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                  onChange={(e) => {
                    e.preventDefault();
                    setKeyword(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
