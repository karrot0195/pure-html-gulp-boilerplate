# PURE HTML BOILERPLATE

> Gulp, Pug, Scss

## Install dependency

> yarn install

**Recommend:** node: 12.22.0

## Features

- Support Pug, Scss.

## How to run

- Develop
  > gulp watch
  > Default run at PORT 8080. You can customize by BROWSER_PORT=8080
- Build
  > gulp build

## Infrastructure

- src
  - pug
    - index.pug → **Don't touch it**
    - about-us.pug → Clone it for new page
    - layout/ → **Include layout template**
  - scss → Use it for styles
  - data.json → Use it to modify data
- dist/ → Resource after built
