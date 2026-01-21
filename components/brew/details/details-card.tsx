type Props = {
  title: string;
  children: React.ReactNode;
};

export default function DetailCard({ title, children }: Props) {
  return (
    <div className="grid-row space-y-4 md:space-y-0 md:grid md:grid-cols-8">
      <div className="flex items-center justify-center">
        <h3 className="text-2xl font-semibold text-primary md:-rotate-90">
          {title}
        </h3>
      </div>
      <div className="space-y-3 border bg-card w-full p-8 rounded-tr-3xl col-span-7">
        {children}
      </div>
    </div>
  );
}
