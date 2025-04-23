import AdminSidebar from "@/Components/AdminSidebar";
import Navbar from "@/Components/Navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <section className="mx-5 flex">
      <div className="flex shadow-2xl p-5 min-w-[200px] h-screen">
        <AdminSidebar />
      </div>
      <div className="flex p-10 h-auto">{children}</div>
    </section>
    </>
  );
}
