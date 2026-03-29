# slug-wizard

## 📌 Description
`slug-wizard` is a lightweight, dependency-free NPM package that converts text into a URL-friendly slug. It also ensures uniqueness by checking against an existing list of slugs and appending a number if necessary.

## 🚀 Features
- **No dependencies** – Fully implemented in pure JavaScript.
- **Removes special characters** – Keeps only alphanumeric characters and hyphens.
- **Handles Unicode characters** – Converts accented letters (e.g., `Café` → `cafe`).
- **Ensures uniqueness** – Appends numbers if the slug already exists.
# Slug Wizard 🧙‍♂️

Create unique, SEO-friendly, and customizable slugs for your applications.

## Features
- **Custom Separators**: Choose `-`, `_`, `.`, or anything else.
- **Transliteration**: Automatically handle symbols like `&`, `+`, `@`.
- **MaxLength**: Robust, word-safe truncation.
- **Stopwords**: Easily strip common words.
- **Unique Slugs**: Smart collision handling with counters or random suffixes.
- **Async Support**: Check uniqueness against databases via callbacks.
- **TypeScript**: Fully typed out of the box.

## Installation
```bash
npm install slug-wizard
```

## Basic Usage
```javascript
import { createSlug } from 'slug-wizard';

// Default (- separator, lowercase)
console.log(createSlug("Hello World!")); // hello-world

// Customizable
console.log(createSlug("Fruit & Veggies", { separator: '_', stopWords: ['and'] })); 
// fruit_veggies
```

## Advanced Usage

### Options Reference
| Option | Default | Description |
|---|---|---|
| `separator` | `'-'` | Word separator character |
| `lowercase` | `true` | Convert to lowercase |
| `maxLength` | `Infinity` | Max length (word-safe) |
| `stopWords` | `[]` | Words to remove |

### Unique Slugs
```javascript
import { generateUniqueSlug } from 'slug-wizard';

const existing = ['my-post', 'my-post-1'];

// With counter (default)
console.log(generateUniqueSlug("My Post", { existingSlugs: existing })); 
// my-post-2

// With random suffix
console.log(generateUniqueSlug("My Post", { existingSlugs: existing, randomSuffix: true })); 
// my-post-x7f2
```

### Async Database Check
```javascript
const slug = await generateUniqueSlug("Premium Product", {
  checkCallback: async (val) => {
    const exists = await db.products.findFirst({ where: { slug: val } });
    return !!exists;
  }
});
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

