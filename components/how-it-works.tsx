export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter your handle",
      description: "Type your X username and hit generate. That&apos;s it.",
    },
    {
      number: "02",
      title: "We pull real data",
      description: "We fetch your actual tweets, likes, and engagement from the past month.",
    },
    {
      number: "03",
      title: "Get your recap",
      description: "See your top posts, patterns, and AI-powered insights for growth.",
    },
  ];

  return (
    <section id="how" className="py-24 px-6 bg-background-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-gold/80 border border-gold/20 rounded-full mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Three simple steps
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="relative p-8 bg-background-3 border border-border rounded-2xl group hover:border-border-2 transition-colors"
            >
              <div className="text-5xl font-bold text-gold/20 mb-4 font-mono">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
