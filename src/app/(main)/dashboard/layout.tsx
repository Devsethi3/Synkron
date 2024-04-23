import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Synkron",
  description: "User's Dashboard",
};

interface DashbaordLayoutProps {
  children: React.ReactNode;
  params: any;
}
const DashbaordLayout: React.FC<DashbaordLayoutProps> = ({
  children,
  params,
}) => {
  return (
    <>
      <main className="flex overflow-hidden h-screen">{children}</main>
    </>
  );
};

export default DashbaordLayout;
