import * as React from "react";

interface Props {
    children: (
        handleScroll: (x: number, y: number) => void,
        handleScrollById: (id: string, x: number, y: number) => void
    ) => React.ReactElement<any>;
}

/**
 * ScrollTo component is a render prop that provides scrolling functionality.
 * 
 * @param  {Props} props 
 */
declare function ScrollTo(props: Props): React.ReactElement<any>;
export default ScrollTo;