interface MainProps {
  children: React.ReactNode
}

export default function Main({ children }: MainProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16">
      {children}
    </main>
  )
}
