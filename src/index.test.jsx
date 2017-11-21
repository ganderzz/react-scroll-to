import React from "react";
import { ScrollTo, ScrollToHOC } from "./";

describe("Test ScrollTo Component.", () => {
    describe("Test render prop.", () => {
        it("Should render the functional children.", () => {
            const elem = (
                <ScrollTo>
                    {(scroll) => (
                        <div>
                            test
                        </div>
                    )}
                </ScrollTo>
            );
    
            expect(typeof elem.props.children).toBe("function");
        });

        it("Should render nothing on null.", () => {
            const elem = (
                <ScrollTo>
                    {null}
                </ScrollTo>
            );

            expect(elem.props.children).toBe(null);
        });
    });
    
    describe("Test HOC.", () => {
        it("Should render the functional children.", () => {
            const Elem = ScrollToHOC(
                <div>
                    test
                </div>
            );
    
            expect(typeof (<Elem />)).toBe("object");
        });

        it("Should render nothing on null.", () => {
            const Elem = ScrollToHOC(null);
    
            expect((<Elem />).props.children).toBeFalsy();
        });
    });
});