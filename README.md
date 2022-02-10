# nextjs-fundamentals

# 0.2 Creating a Project (02:51)

```sh
npx create-next-app@latest --typescript
npm run dev
```

# 1.0 Library vs Framework (06:42)

## Library

- is called by my code

## Framwork

- calls my code
- But should put my code at right place

```sh
rm -rf pages/*
touch pages/index.tsx

export default function Home() {
  return "hi";
}
```

## File naming rule with route

- index.tsx -> /
- about.js -> /about

# 1.1 Pages (05:10)

- Should export component with `default`
- 404 is done

# 1.2 Static Pre Rendering (10:24)

- Client side render
  - Starts with only one empty `<div id="root">`
  - Without enabling JS, can't see react
  - With slow network like 3g, each html elements is loaded slowly
- Statically generated
  - Even though disable JS, html stil exists
  - Pre-rendered with init state
  - Enable JS again -> Hydration: ReactJs takes over the init html

# 1.3 Routing (08:04)

- Should not use `<a>` tag -> reload
- Use `Link` with `<a>`, style can be only with `<a>`

```tsx
<Link href="/">
  <a style={{ color: router.pathname === "/" ? "red" : "blue" }}>Home</a>
</Link>
```

```ts
mkdir components
touch components/NavBar.tsx
touch pages/about.tsx
```
