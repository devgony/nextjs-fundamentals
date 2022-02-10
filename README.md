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

# 1.4 CSS Modules (06:54)

- Use CSS Module

```sh
touch components/NavBar.module.css
```

- Handle class name with styles.className

```tsx
import styles from "./NavBar.module.css";
<a className={styles.className}></a>;
```

- Can use dupplicated class name -> nextjs randomize className!
- How to use more then 2 css module

1. template literal

```tsx
className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}
```

2. join(" ")

```tsx
className={
  [styles.link,
   router.pathname === "/about" ? styles.active : ""
  ].join(" ")}
```

3. ???

# 1.5 Styles JSX (06:56)

- Use style jsx at the end of component
- No need to use classname -> with just tag, it create randomized className
- Can use manual className as well
- It is not Cascade -> Only adjust to same component scope

```tsx
<div>
  ...
  <style jsx>{`
    nav {
      background-color: tomato;
    }
    a {
      text-decoration: none;
    }
    .active {
      color: yellow;
    }
  `}</style>
</div>
)}
```
