interface NavbarProps {
  onNewSearch: () => void;
  showNewSearch: boolean;
}

export function Navbar({ onNewSearch, showNewSearch }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="font-semibold text-gold tracking-wide">
        <span className="opacity-60 mr-1">&#10022;</span> X RECAP
      </div>
      
      <ul className="hidden md:flex items-center gap-8">
        {!showNewSearch && (
          <>
            <li>
              <a 
                href="#how" 
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                How it works
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Features
              </a>
            </li>
          </>
        )}
      </ul>
      
      {showNewSearch && (
        <button
          onClick={onNewSearch}
          className="px-4 py-2 text-sm font-medium text-gold border border-gold/40 rounded-lg hover:bg-gold/10 transition-colors"
        >
          New Search
        </button>
      )}
    </nav>
  );
}
