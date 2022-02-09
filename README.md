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
touch pages/index.ts

export default function Home() {
  return "hi";
}
```

## File naming rule with route

- index.ts -> /
- about.js -> /about

# 1.1 Pages (05:10)

- Should export component with `default`
- 404 is done
