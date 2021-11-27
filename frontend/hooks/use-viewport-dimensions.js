import { useEffect, useState } from "react";

//servono per poter renderizzare condizionalmente component diversi in base alla viewport
function GetWindowDimensions() {
  var w = {};

  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    w = {
      width,
      height,
    };
  }

  return w;
}

export default function useWindowDimensions() {
  //mounted controlla che il component si è montato
  const [mounted, setMounted] = useState(false); //lo uso per evitare errori in console "Expected server HTML to contain matching <element>"
  const [windowDimensions, setWindowDimensions] = useState(
    GetWindowDimensions()
  );

  useEffect(() => {
    setMounted(true);
    function handleResize() {
      setWindowDimensions(GetWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); //only runs once, when component did mount
  //if omitted it runs on every re-render
  //if put value in it, it will execute the code once on mount and whenever the variable changes

  return mounted && windowDimensions; //ritorno solo quando il component si monta
}
