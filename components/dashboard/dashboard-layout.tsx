type DashboardLayoutProps = Readonly<{
  title: string;
  children: React.ReactNode;
}>;

export default function DashboardLayout({
  title,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col gap-6 p-6">
      <header>
        <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      </header>

      {children}
    </div>
  );
}
