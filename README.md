<div style="text-align: center; padding: 20px; background-color: #f0f0f0; border-radius: 10px; margin-bottom: 20px;">
  <h1 style="font-size: 2.5em; color: #333;">✨ UI Gen ✨</h1>
  <p style="font-size: 1.2em; color: #666;">Generate UI components across different libraries effortlessly</p>
</div>

---
A modern CLI tool for scaffolding and managing UI components across different component libraries. Generate, customize, and maintain your UI components with ease.

<a href="https://imgbox.com/Rtx5hiZ3" target="_blank"><img src="https://thumbs2.imgbox.com/dd/72/Rtx5hiZ3_t.png" alt="image host"/></a>

[![asciicast](https://asciinema.org/a/lGeMMYyKeISbAIvdlbXJrDNwU.svg)](https://asciinema.org/a/lGeMMYyKeISbAIvdlbXJrDNwU)

## Features ✨

- 🚀 Quick component generation
- 📚 Support for multiple UI libraries
- 🎨 Customizable templates
- 🔄 Auto-install dependencies
- 📦 Built-in component registry
- 🛠 TypeScript support
- 🧪 Test file generation

## Installation 🔧

not yet published to npm, you can build it locally and link it to your project.

```bash
# Using npm
npm install -g uigen

# Using yarn
yarn global add uigen

# Using pnpm
pnpm add -g uigen
```

## Usage 💻

### Basic Commands

```bash
# Generate a new component
uigen add button

# Generate with specific options
uigen add -c button -l aceternity -o ./components/ui

# List available components
uigen list

# Show help
uigen help

# Show version
uigen --version
```

### Command Options

```bash
Options:
  -c, --component <name>    Component name
  -l, --library <name>      UI library (default: "shadcn")
  -o, --outDir <path>      Output directory
```

## Supported Libraries 📚

- [Aceternity UI](https://ui.aceternity.com/)
- More coming soon...

## Project Structure 📁

```
your-project/
├── components/
│   └── ui/
│       ├── button/
│       │   ├── button.tsx
│       │   └── button.test.tsx
│       └── form/
│           ├── form.tsx
│           └── form.test.tsx
└── lib/
    └── utils/
        └── cn.ts
```

## Configuration (wip) ⚙️

Create a `uigen.config.js` file in your project root:

```javascript
module.exports = {
  outDir: './components/ui',
  library: 'shadcn',
  typescript: true,
  test: true,
  prettier: true,
  registry: {
    // Custom component registry
  },
};
```

## Contributing 🤝

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Roadmap 🗺️

- [ ] Add more UI libraries
- [ ] Component dependency management
- [ ] Interactive component customization
- [ ] Component documentation generator
- [ ] Component showcase generator
- [ ] Visual component editor

## License 📄

MIT © [DoffuXx](https://github.com/DoffuXx)

## Acknowledgments 🙏

- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Built with [Commander.js](https://github.com/tj/commander.js/)
- Uses [TypeScript](https://www.typescriptlang.org/)

---

<p align="center">Made with ❤️ by [DoffuXx] </p>
