export default function DashboardLayout({
  children,
  title,
  description,
  rightContent,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  rightContent?: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <header className="w-full flex items-end">
        <section className="w-full flex-col justify-between items-center">
          <h2 className="text-2xl font-semibold text-foreground text-primary">
            {title}
          </h2>
          <span className="text-foreground opacity-50">{description}</span>
        </section>
        {rightContent}
      </header>
      <main>{children}</main>
    </section>
  );
}
