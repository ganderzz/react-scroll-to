import React, { Component } from "react";
import { render } from "react-dom";
import { ScrollTo, ScrollToHOC } from "../src";

const ToTop = ScrollToHOC(function(props) {
    return (
        <button onClick={() => props.scroll(0, 0)} style={props.style}>
            To Top
        </button>
    );
});

window.onload = () => {
    render(
        <div style={{ padding: "20px" }}>
            <ScrollTo>
                {
                    (onScroll) => (
                        <button
                            onClick={() => onScroll(0, document.body.offsetHeight)}
                            style={{ display: "block" }}
                        >
                            Scroll to Bottom
                        </button>
                    )
                }
            </ScrollTo>

            <ScrollTo>
                {
                    (scroll) => (
                        <button
                            onClick={() => scroll(0, 20)}
                            style={{ display: "block", marginTop: "500px" }}
                        >
                            Scroll to Top
                        </button>
                    )
                }
            </ScrollTo>

            <ToTop style={{ display: "block", marginTop: "500px" }} />
        </div>,
        document.getElementById("APP")
    );
}
