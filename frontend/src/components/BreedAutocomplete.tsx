import { useMemo, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { capitalize } from "../utils/text"

interface BreedAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (breed: string) => void
  options: string[]
  maxResults?: number
}

function Highlight({ text, query }: { text: string, query: string }) {
  const label = capitalize(text)
  const start = text.indexOf(query)
  if (!query || start === -1) return <>{label}</>
  const end = start + query.length
  return (
    <>
      {label.slice(0, start)}
      <strong className="font-extrabold text-brand-600">{label.slice(start, end)}</strong>
      {label.slice(end)}
    </>
  )
}

export default function BreedAutocomplete({ value, onChange, onSelect, options, maxResults = 8 }: BreedAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)

  const query = value.trim().toLowerCase()

  const results = useMemo(() => {
    if (!query) return []
    const starts = options.filter(o => o.startsWith(query))
    const wordStarts = options.filter(o => !o.startsWith(query) && o.split(" ").some(w => w.startsWith(query)))
    const contains = options.filter(o => !o.split(" ").some(w => w.startsWith(query)) && o.includes(query))
    return [...starts, ...wordStarts, ...contains].slice(0, maxResults)
  }, [options, query, maxResults])

  const showList = open && query.length > 0

  function select(breed: string) {
    onChange(breed)
    onSelect(breed)
    setOpen(false)
    setActive(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showList || results.length === 0) {
      if (e.key === "ArrowDown") setOpen(true)
      return
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActive(i => (i + 1) % results.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setActive(i => (i <= 0 ? results.length - 1 : i - 1))
        break
      case "Enter":
        if (active >= 0) {
          e.preventDefault()
          select(results[active])
        } else {
          setOpen(false)
        }
        break
      case "Escape":
        setOpen(false)
        setActive(-1)
        break
    }
  }

  return (
    <div className="relative flex-1">
      <FaSearch className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-stone-400" />
      <input
        type="text"
        role="combobox"
        aria-expanded={showList}
        aria-controls="breed-listbox"
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `breed-option-${active}` : undefined}
        autoComplete="off"
        autoFocus
        placeholder="Ex: akita, pug, golden retriever..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
          setActive(-1)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-xl border border-stone-200 bg-white py-3 pr-4 pl-11 shadow-sm transition outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
      />

      {showList && (
        <ul
          id="breed-listbox"
          role="listbox"
          className="absolute top-full right-0 left-0 z-20 mt-2 max-h-80 overflow-auto rounded-xl border border-stone-200 bg-white py-1 shadow-lg"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-stone-400">Nenhuma raça encontrada</li>
          ) : (
            results.map((breed, i) => (
              <li
                key={breed}
                id={`breed-option-${i}`}
                role="option"
                aria-selected={i === active}
                // mousedown + preventDefault evita que o blur do input feche a lista antes do clique
                onMouseDown={(e) => {
                  e.preventDefault()
                  select(breed)
                }}
                onMouseEnter={() => setActive(i)}
                className={`cursor-pointer px-4 py-2.5 text-stone-700 ${i === active ? "bg-brand-50" : ""}`}
              >
                <Highlight text={breed} query={query} />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
