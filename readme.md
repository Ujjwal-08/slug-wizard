# slug-wizard

## 📌 Description
`slug-wizard` is a lightweight, dependency-free NPM package that converts text into a URL-friendly slug. It also ensures uniqueness by checking against an existing list of slugs and appending a number if necessary.

## 🚀 Features
- **No dependencies** – Fully implemented in pure JavaScript.
- **Removes special characters** – Keeps only alphanumeric characters and hyphens.
- **Handles Unicode characters** – Converts accented letters (e.g., `Café` → `cafe`).
- **Ensures uniqueness** – Appends numbers if the slug already exists.
- **Works in both frontend & backend** – Can be used in Node.js and browser environments.

## 📦 Installation

Install via NPM:
```sh
npm install slug-wizard
```

Install via Yarn:
```sh
yarn add slug-wizard
```

## 🛠 Usage

### Basic Usage
```javascript
const { createSlug, generateUniqueSlug } = require("slug-wizard");

// Convert text into a URL-friendly slug
console.log(createSlug("Hello World!")); // Output: "hello-world"
console.log(createSlug("My First Post!!!")); // Output: "my-first-post"
console.log(createSlug("Café & Bar")); // Output: "cafe-bar"
```

### Ensuring Unique Slugs
```javascript
const existingSlugs = ["hello-world", "my-first-post", "awesome-slug"];

console.log(generateUniqueSlug("Hello World", existingSlugs)); // Output: "hello-world-1"
console.log(generateUniqueSlug("My First Post", existingSlugs)); // Output: "my-first-post-1"
console.log(generateUniqueSlug("Awesome Slug", existingSlugs)); // Output: "awesome-slug-1"
console.log(generateUniqueSlug("New Post", existingSlugs)); // Output: "new-post"
```

## 🛠 API Reference

### `createSlug(text: string): string`
Converts a given text into a slug by:
- Removing special characters
- Converting to lowercase
- Replacing spaces with `-`

### `generateUniqueSlug(text: string, existingSlugs: string[]): string`
Converts text into a slug and ensures it is unique within a provided array of existing slugs.

## 🤝 Contributing
Feel free to submit issues and pull requests! Any contributions are welcome.

## 💖 Support & Donations
If you find this package helpful, consider supporting its development:

👉 [Donate on Patreon](https://www.patreon.com/c/BABU_ISHU)  

## 📄 License
This project is licensed under the **MIT License**.

