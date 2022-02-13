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

# 1.6 Custom App (10:10)

## Add global style -> just add `global`

```tsx
<style jsx global>
```

- But only works when those component is rendered -> Use App component

## App component: blueprint of components

- Can save dupplicated component like NavBar
- Prefix with `_`: `_app.tsx`

```sh
touch pages/_app.tsx
```

- globals.css -> Can import only in App component
  - (Normal tsx should import CSS Module)

# 2.0 Patterns (06:45)

## Layout

- PropsWithChildren

```tsx
touch components/Layout.tsx

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
```

## Head

- import `Head` from "next/head"

```sh
touch components/Seo.tsx
```

# 2.1 Fetching Data (11:35)

## `components/NavBar.js`

- Add logo -> Recommanded to use `Image` from `next/image`
- All assets should be at `/public`
- Add style jsx

## `pages/index.js`

- Fetch data with API
- Render movie title
- How to Hide API key?

## `styles/globals.css`

- Add max-width

# 2.2 Redirect and Rewrite (13:31)

## Redirect

- Use Pattern matching with `:path*`

```ts
async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
      {
        source: "/src2/:path*",
        destination: "/dest2/:path*",
        permanent: false,
      },
    ];
  },
```

## Rewrite

- Instead of redirecting, GET data through proxy server
- Can hide API_KEY

```ts
// touch .env
const API_KEY = process.env.API_KEY
async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
```

## `index.tsx`

- Add movie-card styles

# 2.3 Server Side Rendering (11:24)

## `pages/index.js`

### getServerSideProps

```ts
export async function getServerSideProps() {
  const { results }: { results: [movie] } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
```

- Whatever putting here will be run on server
- Can reduce first loading time, But may be able to slower for each next request
- Initial html has all elements -> Good for SEO

# 2.4 Recap (05:16)

- NestJs puts all data in _NEXT_DATA_

# 2.5 Dynamic Routes (07:02)

1. movies

- `pages/movies.tsx`

2. movies and movies/all

- `pages/movies/index.tsx` -> movies
- `pages/movies/all.tsx` -> movies

3. movies with params

- `pages/movies/[id].tsx`
- `useRouter().query.id`

```sh
mkdir pages/movies
touch "pages/movies/[id].tsx"
```

# 2.6 Movie Detail (13:32)

- `useRouter.push` instead of Link

```ts
router.push(`movies/${id}`);
```

- Add 2nd redirect at `next.conif.js`
- Pass state with `query`
- Mask query with `as`
  - Can't use just directly use url
  - User should follow proper step

```ts
router.push(
  {
    pathname: `/movies/${id}`,
    query: {
      title, // send state
    },
  },
  `/movies/${id}` // mask
);
```

# 2.7 Catch All (10:21)

## If don't need to mask params

1. Create file with name `[...variable].tsx`
2. Send all params with `pathname` separated by `/`
3. NextJs parses the pathname with `/` and gives into array

## How to use?

1. `useRouter().query`
2. with `getServerSideProps`

```ts
export default function Detail({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [title, id] = params || [];
}

interface IParams extends ParsedUrlQuery {
  params: [title: string, id: string];
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<IParams>) {
  return {
    props: { params: params?.params },
  };
}
```
