import { useState } from "react";
import { useAnimation, useCycle } from "framer-motion";
//this file is from the template, please refer to the read me file.

//Below logic is for toggling the navbar when toggleNavbar is called. It is used on mobile toggling of navbar.
export default function useAnimatedNavToggler() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [x, cycleX] = useCycle("0%", "150%");
  const animation = useAnimation();

  const toggleNavbar = () => {
    setShowNavLinks(!showNavLinks);
    animation.start({ x: x, display: "block" });
    cycleX();
  };

  return { showNavLinks, animation, toggleNavbar }
}
