interface MainProps {
  children: React.ReactNode
}

export default function Main({ children }: MainProps) {
  return(
    <main className="flex justify-center w-full">
      {children}
    </main>
  )
}