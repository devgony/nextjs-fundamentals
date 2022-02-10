import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1 className="gray">Hello</h1>
      <style jsx>{`
        .gray {
          color: gray;
        }
      `}</style>
    </div>
  );
}
