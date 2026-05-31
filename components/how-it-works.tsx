export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter your handle",
      description: "Type your X username. No login, no permissions, no hassle.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "We analyze everything",
      description: "Real tweets, real engagement, real patterns from the past month.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Get your story",
      description: "A cinematic recap with insights, top posts, and growth tips.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how" className="relative py-32 px-6 bg-background-2 overflow-hidden noise">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-[0.2em] text-gold/80 border border-gold/20 rounded-full mb-6">
            THE PROCESS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Three simple steps
          </h2>
          <p className="mt-4 text-lg text-muted max-w-md mx-auto">
            From handle to insights in seconds.
          </p>
        </div>
        
        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="group relative"
            >
              {/* Connector Line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-border via-gold/20 to-border -translate-x-1/2 z-0" />
              )}
              
              <div className="relative p-8 lg:p-10 bg-background-3/50 border border-border rounded-2xl card-hover h-full">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold border border-gold/20 group-hover:bg-gold/20 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-bold text-gold/20 font-mono">
                    {step.number}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
