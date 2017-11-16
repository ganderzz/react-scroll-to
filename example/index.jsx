import React, { Component } from "react";
import { render } from "react-dom";
import { ScrollTo } from "../dist/react-scroll-to";

window.onload = () => {
    render(
        <div style={{ padding: "20px" }}>
            <ScrollTo>
                {
                    (onScroll) => (
                        <button
                            onClick={onScroll(0, document.body.offsetHeight)}
                            style={{ display: "block" }}
                        >
                            Scroll to Bottom
                        </button>
                    )
                }
            </ScrollTo>

            <ScrollTo>
                {
                    (onScroll) => (
                        <button
                            onClick={onScroll(0, 20)}
                            style={{ display: "block", marginTop: "500px" }}
                        >
                            Scroll to Top
                        </button>
                    )
                }
            </ScrollTo>

            <ScrollTo>
                {
                    (onScroll) => (
                        <button
                            onClick={onScroll(0, 0)}
                            style={{ display: "block", marginTop: "500px" }}
                        >
                            Scroll to Top
                        </button>
                    )
                }
            </ScrollTo>
        </div>,
        document.getElementById("APP")
    );
}
