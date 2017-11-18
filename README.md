<h1 align="center">
    👟 React Scroll-To
</h1>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 

A React component that helps in scrolling around a page.

React Scroll-To provides a Higher Order Component, and Render Props implementation.

### Install

**npm:** `npm install react-scroll-to --save`

**yarn:** `yarn add react-scroll-to`


### Example

**Render Props:**

```
import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";

export default class MyComponent extends Component {
    render() {
        return (
            <ScrollTo>
                {
                    (scroll) => (
                        <a onClick={scroll(0, 500)}>
                            Scroll to Bottom
                        </a>
                    ) 
                }
            </ScrollTo>
        );
    }
}
```

**Higher Order Component:**

```
import React from "react";
import { ScrollToHOC } from "react-scroll-to";

export default ScrollToHOC(function(props) {
    return (
        <a onClick={props.scroll(0, 500)}>
            Scroll to Bottom
        </a>
    );
})
```
