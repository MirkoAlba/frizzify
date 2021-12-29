import { useState, useEffect, useRef, useCallback } from "react";

export default function LeftNav() {
  const sidebarRef = useRef(null);
  const sidebarMinWidth = 200,
    sidebarMaxWidth = 400;
  const [sidebarWidth, setSidebarWidth] = useState(sidebarMinWidth);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
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

  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty(
      "--sidebarWidth",
      sidebarWidth + "px"
    );
  }

  return (
    <div
      ref={sidebarRef}
      className="player-main__nav"
      style={{
        width: sidebarWidth,
        minWidth: sidebarMinWidth,
        maxWidth: sidebarMaxWidth,
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="player-main__nav--content" />
      <div className="player-main__nav--resizer" onMouseDown={startResizing} />
    </div>
  );
}
