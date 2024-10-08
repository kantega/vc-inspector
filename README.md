<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Poirot</h1>
  <h3 align="center">(Previously known as VC Inspector)</h3>

  <p align="center">
    Open-sourced tool for inspecting verifiable credentials.
    <br />
    <a href="https://kantega.github.io/vc-inspector/inspector-docs/index.html"><strong>Explore the docs for the inspector»</strong></a>
    <br />
    <br />
    <a href="https://kantega.github.io/vc-inspector/">View Demo</a>
    ·
    <a href="https://github.com/kantega/vc-inspector/issues/new?labels=bug&template=reported-bug.yaml">Report Bug</a>
    ·
    <a href="https://github.com/kantega/vc-inspector/issues/new?labels=feature&template=feature-request.yaml">Request Feature </a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[![VC inspector Screen Shot][product-screenshot]](https://poirot.id)

Open-sourced tool for inspecting verifiable credentials.

Will be aligned with eIDAS 2.0

<stong>Crafted by Kantega</stong>

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

### 1 - Install Prerequisites

This project uses pnpm as a package manager. Others may work, but issues with other package managers will not be fixed.

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

### 3 - Start development environment

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Other

Other possibilties, <b>remember to complete the two first installation above before running any of these</b>.

#### Storybook

Storybook shows compoents in isolations, to start storybook run:

```sh
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser.

#### Documentation

Documentaion is hosted <a href="https://kantega.github.io/vc-inspector/inspector-docs/index.html">here</a>, but can be generated locally to, run

```sh
pnpm typedoc
```

to generate the documentation (Note: a lot of warnings are generated but this is fine.)

Than you can open the ./out/inspector-docs/index.html with a browser or serve it with:

```sh
pnpx http-server out/inspector-docs/
```

#### Pre-commits (recommended)

Pre-commits runs before a commit and runs linting and formating.
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

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments and Origins

The first version of this tool was developed as part of a master's thesis in collaboration between NTNU and Kantega. [Complete thesis](https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/3137516)
Special thanks to Thomas H. Svendal and Carl J. Gutzkow for their contributions.

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
