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

## 2.2 Not Found Routes

- `app/not-found.tsx` handles global error

```sh
rm -rf app/about-us/company

mkdir components
touch app/not-found.tsx \
components/navigation.tsx
```

## 2.3 SSR vs CSR

- In SSR, server renders html and gives browser full html
- CSR gets empty html and browser will fill html with js later
- usePathName works only with `use client`
  - but even with `use client`, it is still SSR. it `also` works as `client`

## 2.4 Hydration

- after rendering html, hydrate events with js
- clicking href is hijacked by js and virtually moves url

```
/about-us --> <button>0</button> --SSR-> user👀 --Hydartion-> onClick
```

## 2.5 'use client'

- hydration only affects component with `use client`
- strategy: write component first (as ServerComponent) and only when got below error, put `use client`

```
× You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
```
