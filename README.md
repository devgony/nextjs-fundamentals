# Nextjs Fundamentals with app-router [Next14]

# 1 INTRODUCTION

## 1.6 Project Setup

```sh
npm init -y
# with MIT license
npm install react@latest next@latest react-dom@latest
# "dev": "next dev"
```

```ts
// mkdir app
// touch app/page.tsx
export default function Tomato() {
  return <h1>Hello!</h1>;
}
```

Right after `npm run dev` and access to `localhost:3000`, next does:
` ⚠ Your page app/page.tsx did not have a root layout. We created app/layout.tsx for you.`

# 2 ROUTING

## 2.1 Defining Routes

- define a page by default exporting a component from a page.{js, jsx, tsx} file.

```sh
mkdir -p app/about-us/company/sales/
touch app/about-us/company/sales/page.tsx
touch app/about-us/company/page.tsx
touch app/about-us/page.tsx
```
