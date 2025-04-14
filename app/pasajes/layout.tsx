export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="w-full flex">
        {children}
      </div>
  );
}