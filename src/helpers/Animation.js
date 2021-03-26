//not my code, module from npm package was failing to read due to no dist folder had to import it manually.
//https://www.npmjs.com/package/use-in-view this is the npm package
import { useEffect, useState } from "react";
import throttle from "lodash.throttle";

export default (offset = 0) => {
    const [ref, setRef] = useState(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const elementYPos = () => {
            return (
                ref.getBoundingClientRect().top +
                window.pageYOffset -
                window.innerHeight +
                offset
            );
        };

        if (!ref) {
            return;
        }

        const handleScroll = throttle(() => {
            if (!ref) {
                return;
            }

            if (window.pageYOffset >= elementYPos()) {
                window.removeEventListener("scroll", handleScroll);
                setInView(true);
            }
        }, 200);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [ref, offset]);

    return [setRef, inView];
};
