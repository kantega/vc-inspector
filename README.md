<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kantega/vc-inspector">
    <img src="images/logo-with-background.png" alt="Logo" width="200" style="background-color: white">
  </a>

  <h3 align="center">VC-Inspector</h3>

  <p align="center">
    Open-sourced tool for inspecting verifiable credentials.
    <br />
    <a href="https://vc-inspector.vercel.app/inspector-docs/index.html"><strong>Explore the docs for the inspector»</strong></a>
    <br />
    <br />
    <a href="https://vc-inspector.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/kantega/vc-inspector/issues/new?labels=bug&template=reported-bug.yaml">Report Bug</a>
    ·
    <a href="https://github.com/kantega/vc-inspector/issues/new?labels=feature&template=feature-request.yaml">Request Feature </a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![VC inspector Screen Shot][product-screenshot]](https://example.com)

Open-sourced tool for inspecting verifiable credentials.

Will be aligned with eIDAS 2.0

<stong>Created by Kantega</stong>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project is a next.js project.

- [![Next][Next.js]][Next-url]

Using other technologies like:

- Tailwindcss
- Chadcn/ui
- Cypress
- Vitest
- Lucide
- Storybook
- Typedoc

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Note: Remember to follow theses in steps.

### 1 - Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- pnpm
  ```sh
  npm install pnpm@9.0.6 -g
  ```

### 2 - Installation

1. Clone the repo
   ```sh
   git clone git@github.com:kantega/vc-inspector.git
   ```
2. cd into folder
   ```sh
   cd vc-inspector
   ```
3. Install packages
   ```sh
   pnpm install
   ```

### Start development environment

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

#### Storybook

```sh
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser.

#### Pre-commits (recommended)

Before first commit, run:

```bash
pnpm husky
```

to initialize husky pre-commits.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Support for SD-JWT
- [ ] Assure alignment with eIDAS 2.0

See the [open issues](https://github.com/kantega/vc-inspector/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b <issue-number>/feature-name`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin <issue-number>/feature-name`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Original creators:

- Thomas H. Svendal - thomassvendal@gmail.com
- Carl J. Gutzkow - cjgutzkow@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## FAQ:

### Error when running storybook (SB_BUILDER-WEBPACK5_0003 (WebpackCompilationError): There were problems when compiling your code with Webpack):

Found this issue when using pnpm version 8. Use pnpm version 9.0.6.

## Acknowledgments

- [Lucide](https://lucide.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/kantega/vc-inspector.svg?style=for-the-badge
[contributors-url]: https://github.com/kantega/vc-inspector/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kantega/vc-inspector.svg?style=for-the-badge
[forks-url]: https://github.com/kantega/vc-inspector/network/members
[stars-shield]: https://img.shields.io/github/stars/kantega/vc-inspector.svg?style=for-the-badge
[stars-url]: https://github.com/kantega/vc-inspector/stargazers
[issues-shield]: https://img.shields.io/github/issues/kantega/vc-inspector.svg?style=for-the-badge
[issues-url]: https://github.com/kantega/vc-inspector/issues
[license-shield]: https://img.shields.io/github/license/kantega/vc-inspector.svg?style=for-the-badge
[license-url]: https://github.com/kantega/vc-inspector/blob/main/LICENSE.txt
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
