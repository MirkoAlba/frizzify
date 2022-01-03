import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useLoaded } from "../../hooks/use-loaded";

import { useStoreActions, useStoreState } from "easy-peasy";

import Link from "next/link";
import { useRouter } from "next/router";

// svgs
import Home from "../../assets/nav/home.svg";
import HomeFill from "../../assets/nav/home-fill.svg";
import Search from "../../assets/nav/search.svg";
import SearchFill from "../../assets/nav/search-fill.svg";
import Library from "../../assets/nav/library.svg";
import LibraryFill from "../../assets/nav/library-fill.svg";

export default function LeftNav() {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isSearch = router.pathname === "/search";
  const isLibrary = router.pathname === "/library";

  const mounted = useLoaded();

  const userOptions = useStoreState((state) => state.user.options);
  const setMenuWidth = useStoreActions((actions) => actions.setMenuWidth);

  const sidebarRef = useRef(null);

  const sidebarMinWidth = 200,
    sidebarMaxWidth = 400;
  const [sidebarWidth, setSidebarWidth] = useState(
    userOptions.menuWidth ? userOptions.menuWidth : sidebarMinWidth
  );
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
    console.log("start");
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        var width = mouseMoveEvent.clientX;
        width = width > sidebarMaxWidth ? sidebarMaxWidth : width; // Max width
        width = width < sidebarMinWidth ? sidebarMinWidth : width; // Min width
        setMenuWidth(width);
        setSidebarWidth(width);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  if (mounted) {
    document.documentElement.style.setProperty(
      "--sidebarWidth",
      sidebarWidth + "px"
    );
  }

  return (
    mounted && (
      <Fragment>
        <div className="player-main__nav--mobile bg-nav d-xl-none">
          <div className="player-main__nav--content d-flex align-items-center justify-content-around">
            <div className={isHome ? "active menu--item" : "menu--item"}>
              <Link href="/">
                <a>{isHome ? <HomeFill /> : <Home />}</a>
              </Link>
            </div>
            <div className={isSearch ? "active menu--item" : "menu--item"}>
              <Link href="/search">
                <a>{isSearch ? <SearchFill /> : <Search />}</a>
              </Link>
            </div>
            <div className={isLibrary ? "active menu--item" : "menu--item"}>
              <Link href="/library">
                <a>
                  {isLibrary ? (
                    <LibraryFill className="rotate-270" />
                  ) : (
                    <Library className="rotate-270" />
                  )}
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={sidebarRef}
          className="player-main__nav bg-nav d-none d-xl-block"
          style={{
            width: sidebarWidth,
            minWidth: sidebarMinWidth,
            maxWidth: sidebarMaxWidth,
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="player-main__nav--content">
            <h2 className="pt-3 px-4 text-white">Frizzify</h2>
            <ul className="menu px-2 m-0">
              <li className={isHome ? "active menu--item" : "menu--item"}>
                <Link href="/">
                  <a>
                    {isHome ? <HomeFill /> : <Home />}
                    Home
                  </a>
                </Link>
              </li>
              <li className={isSearch ? "active menu--item" : "menu--item"}>
                <Link href="/search">
                  <a>
                    {isSearch ? <SearchFill /> : <Search />}
                    Cerca
                  </a>
                </Link>
              </li>
              <li className={isLibrary ? "active menu--item" : "menu--item"}>
                <Link href="/library">
                  <a>
                    {isLibrary ? (
                      <LibraryFill className="rotate-270" />
                    ) : (
                      <Library className="rotate-270" />
                    )}
                    Libreria
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="player-main__nav--resizer"
            onMouseDown={startResizing}
          />
        </div>
      </Fragment>
    )
  );
}
