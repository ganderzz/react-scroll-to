<h1 align="center">
    👟 React Scroll-To
</h1>

<div align="center">

[![CircleCI](https://circleci.com/gh/ganderzz/react-scroll-to/tree/master.svg?style=svg)](https://circleci.com/gh/ganderzz/react-scroll-to/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/ganderzz/react-scroll-to/badge.svg?branch=feature%2Fcreate-circi-artifact)](https://coveralls.io/github/ganderzz/react-scroll-to?branch=feature%2Fcreate-circi-artifact)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

A React component that makes scrolling easy.

React Scroll-To provides a Higher Order Component, and Render Props implementation.

**Example:** [View React Storybook Examples](https://ganderzz.github.io/react-scroll-to/)

### Install

**npm:** `npm i react-scroll-to --save`

**yarn:** `yarn add react-scroll-to`

### API

**Render Props:**

```jsx
// Scroll to position (20, 500) in the browser window
import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";

export default class MyComponent extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scroll }) => (
          <a onClick={() => scroll({ x: 20, y: 500 })}>Scroll to Bottom</a>
        )}
      </ScrollTo>
    );
  }
}
```

```jsx
// Scroll to position (0, 500) within all provided <ScrollArea /> children
import React, { Component } from "react";
import { ScrollTo, ScrollArea } from "react-scroll-to";

export default class MyComponent extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scroll }) => (
          <ScrollArea style={{ height: 1000 }}>
            <button onClick={() => scroll({ y: 500, smooth: true })}>
              Scroll within this container
            </button>
          </ScrollArea>
        )}
      </ScrollTo>
    );
  }
}
```

```jsx
// Scroll to position (0, 500) within a specific <ScrollArea /> child
import React, { Component } from "react";
import { ScrollTo, ScrollArea } from "react-scroll-to";

export default class MyComponent extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scroll }) => (
          <div>
            <ScrollArea id="foo" style={{ height: 1000 }}>
              <button onClick={() => scroll({ id: "foo", y: 500 })}>
                Scroll within this container
              </button>
            </ScrollArea>

            <ScrollArea style={{ height: 1000 }}>
              This container won't scroll
            </ScrollArea>
          </div>
        )}
      </ScrollTo>
    );
  }
}
```

```jsx
// Scroll by a component's ref
import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";

export default class MyComponent extends Component {
  myRef = React.createRef();

  render() {
    return (
      <>
        <ScrollTo>
          {({ scroll }) => (
            <a onClick={() => scroll({ ref: this.myRef, x: 20, y: 500 })}>
              Scroll to Bottom
            </a>
          )}
        </ScrollTo>

        <div ref={this.myRef}>My Element</div>
      </>
    );
  }
}
```

**Higher Order Component:**

```jsx
// Scroll to position (0, 500) within the browser window
import React from "react";
import { ScrollToHOC } from "react-scroll-to";

export default ScrollToHOC(function(props) {
  return <a onClick={() => props.scroll({ y: 500 })}>Scroll to Bottom</a>;
});
```

```jsx
// Scroll to position (0, 500) within all provided <ScrollArea /> children
import React from "react";
import { ScrollToHOC, ScrollArea } from "react-scroll-to";

export default ScrollToHOC(function(props) {
  return (
    <ScrollArea style={{ height: 1000 }}>
      <a onClick={() => props.scroll({ y: 500 })}>Scroll to Bottom</a>
    </ScrollArea>
  );
});
```

```jsx
// Scroll to position (0, 500) within a specific <ScrollArea /> child
import React from "react";
import { ScrollToHOC, ScrollArea } from "react-scroll-to";

export default ScrollToHOC(function(props) {
  return (
    <div>
      <ScrollArea id="foo" style={{ height: 1000 }}>
        <a onClick={() => props.scroll({ id: "foo", y: 500 })}>
          Scroll to Bottom
        </a>
      </ScrollArea>

      <ScrollArea style={{ height: 1000 }}>
        This container won't scroll
      </ScrollArea>
    </div>
  );
});
```

### Types:

- **Typescript** definitions are built in
- **Flow** is currently not support (Open for PRs!)

### 2.0 Changes

- v2.0 has a new API for controlling scrolling. Instead of taking two arguments, x and y, the ScrollTo component now takes an object.

```js
scrollTo({
  x: 25 // The horizontal x position to scroll to
  y: 10 // The vertical y position to scroll to
  id: "myId" // The ID of the ScrollArea we want to scroll
  ref: refObj // A reference to a component to scroll
  smooth: true // If true, this will animate the scroll to be smooth. False will give an instant scroll. (defaults: false)
})
```

Mixing and matching these options give different results.

- The `scrollById` function has been deprecated in favor of the `id` field in `scrollTo`

### Smooth Scrolling Not Working?

Some browsers don't natively support smooth scroll. Checkout adding a polyfill like `smoothscroll-polyfill` to fix the issue.

`npm install smoothscroll-polyfill`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.dylanpaulus.com"><img src="https://avatars3.githubusercontent.com/u/5566054?v=4" width="100px;" alt="Dylan Paulus"/><br /><sub><b>Dylan Paulus</b></sub></a><br /><a href="https://github.com/ganderzz/react-scroll-to/commits?author=ganderzz" title="Code">💻</a> <a href="https://github.com/ganderzz/react-scroll-to/commits?author=ganderzz" title="Documentation">📖</a></td>
    <td align="center"><a href="http://anthonyng.me"><img src="https://avatars1.githubusercontent.com/u/14035529?v=4" width="100px;" alt="Anthony Ng"/><br /><sub><b>Anthony Ng</b></sub></a><br /><a href="https://github.com/ganderzz/react-scroll-to/commits?author=newyork-anthonyng" title="Code">💻</a> <a href="https://github.com/ganderzz/react-scroll-to/commits?author=newyork-anthonyng" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/UmenR"><img src="https://avatars1.githubusercontent.com/u/17663679?v=4" width="100px;" alt="UmenR"/><br /><sub><b>UmenR</b></sub></a><br /><a href="https://github.com/ganderzz/react-scroll-to/commits?author=UmenR" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ywen"><img src="https://avatars2.githubusercontent.com/u/22895?v=4" width="100px;" alt="Yi Wen"/><br /><sub><b>Yi Wen</b></sub></a><br /><a href="https://github.com/ganderzz/react-scroll-to/commits?author=ywen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/thisis-Shitanshu"><img src="https://avatars3.githubusercontent.com/u/45510390?v=4" width="100px;" alt="Shitanshu Pandey"/><br /><sub><b>Shitanshu Pandey</b></sub></a><br /><a href="https://github.com/ganderzz/react-scroll-to/commits?author=thisis-Shitanshu" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
