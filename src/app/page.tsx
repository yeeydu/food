import Header from "@/components/Header";
import Search from "@/components/Search";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="px-5 pt-6">
      <Search />
      </div>
    </main>
  );
}
