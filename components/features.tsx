export function Features() {
  const features = [
    {
      icon: "&#10022;",
      title: "Real Data",
      description: "No fake numbers. We pull directly from X&apos;s API for accurate stats.",
    },
    {
      icon: "&#9881;",
      title: "AI Insights",
      description: "Get personalized recommendations based on what&apos;s working for you.",
    },
    {
      icon: "&#9733;",
      title: "Top Content",
      description: "See which tweets resonated most with your audience this month.",
    },
    {
      icon: "&#9203;",
      title: "Timing Analysis",
      description: "Discover your best posting times based on actual engagement.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-gold/80 border border-gold/20 rounded-full mb-4">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="p-6 bg-background-2 border border-border rounded-xl hover:border-border-2 transition-colors"
            >
              <div 
                className="text-2xl text-gold mb-4"
                dangerouslySetInnerHTML={{ __html: feature.icon }}
              />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
