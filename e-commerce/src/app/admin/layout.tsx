import AdminSidebar from "@/Components/AdminSidebar";


export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div className="flex">
          <div className="flex shadow-2xl w-[250px] p-5 min-w-[200px] text-xl h-[735px]">
            <AdminSidebar />
          </div>
          <div className="flex p-5 mx-auto">{children}</div>
        </div>
   
    </>
  );
}