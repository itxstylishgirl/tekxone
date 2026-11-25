const steps = [
  ['01', 'Discover', 'We map your goals, data, and constraints into a clear opportunity.'],
  ['02', 'Design', 'We architect the solution: models, agents, and integrations.'],
  ['03', 'Build', 'We build and integrate, with quality and security baked in.'],
  ['04', 'Grow', 'We launch with care, learn from real use, and keep making it better.'],
]

export default function ProcessList() {
  return (
    <section className="process-list-section">
      <div className="page-shell">
        <div className="process-list-heading">
          <span className="eyebrow">How we work</span>
          <h2>From ambition to outcome.</h2>
        </div>
        <div className="process-list">
          {steps.map(([number, title, description]) => (
            <article className="process-list-row" key={number}>
              <span className="process-list-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="process-list-arrow" aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
