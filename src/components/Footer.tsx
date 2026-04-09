export default function Footer() {
  return (
    <footer className="py-8 section-padding border-t border-[#EDEDEA] dark:border-[#222]" role="contentinfo">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#AAA] dark:text-[#555]">© {new Date().getFullYear()} Automiq</p>
        <div className="flex items-center gap-5">
          <a href="#impressum" className="text-xs text-[#AAA] dark:text-[#555] hover:text-[#555] dark:hover:text-[#AAA] transition-colors underline underline-offset-2 decoration-[#DDD] dark:decoration-[#333]">Impressum</a>
          <a href="#datenschutz" className="text-xs text-[#AAA] dark:text-[#555] hover:text-[#555] dark:hover:text-[#AAA] transition-colors underline underline-offset-2 decoration-[#DDD] dark:decoration-[#333]">Datenschutz</a>
        </div>
      </div>
    </footer>
  )
}
