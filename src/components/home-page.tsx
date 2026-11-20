import type { HomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { ProjectVisual } from "./project-visual";
import { SiteHeader } from "./site-header";

const stack = ["TypeScript", "Next.js", "React", "Node.js", "Supabase", "PostgreSQL"];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

export function HomePage({ locale, content }: { locale: Locale; content: HomeContent }) {
  return (
    <div className="site-canvas">
      <a className="skip-link" href="#main">{content.skip}</a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <SiteHeader locale={locale} content={content} />

      <main id="main">
        <section className="hero shell">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy reveal">
            <div className="availability"><span aria-hidden="true" />{content.hero.cvUnavailable}</div>
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <p className="hero-name">{content.hero.name}</p>
            <h1><span>{content.hero.role}</span>{content.hero.message}</h1>
            <p className="hero-detail">{content.hero.detail}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{content.hero.primaryCta}<ArrowIcon /></a>
              <a className="button button-secondary" href="#contact">{content.hero.secondaryCta}</a>
            </div>
          </div>

          <div className="hero-art reveal reveal-delay" aria-hidden="true">
            <div className="hero-orb" />
            <div className="terminal-card">
              <div className="terminal-bar"><i /><i /><i /><span>portfolio.config.ts</span><b>● live</b></div>
              <div className="terminal-body">
                <p><span>01</span><b>const</b> developer = {'{'}</p>
                <p><span>02</span><i>focus:</i> [<em>&quot;product&quot;</em>, <em>&quot;systems&quot;</em>],</p>
                <p><span>03</span><i>stack:</i> <em>&quot;TypeScript&quot;</em>,</p>
                <p><span>04</span><i>quality:</i> <strong>true</strong>,</p>
                <p><span>05</span>{'}'};</p>
              </div>
              <div className="terminal-footer"><span>BUILD STATUS</span><b>READY TO ITERATE</b></div>
            </div>
            <div className="floating-chip chip-one">API / DATA</div>
            <div className="floating-chip chip-two">UI / MOTION</div>
          </div>
        </section>

        <div className="stack-rail" aria-label="Technology stack">
          <div className="stack-track">
            {[...stack, ...stack].map((item, index) => <span key={`${item}-${index}`}><i aria-hidden="true" />{item}</span>)}
          </div>
        </div>

        <section className="approach section shell">
          <div className="section-heading split-intro">
            <div><p className="section-kicker"><span>01</span>{content.approach.label}</p><h2>{content.approach.title}</h2></div>
            <p>{content.approach.body}</p>
          </div>
          <div className="approach-list">
            {content.approach.items.map((item, index) => (
              <article key={item.title}><div className="card-number">0{index + 1}</div><div><h3>{item.title}</h3><p>{item.body}</p></div></article>
            ))}
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="shell">
            <div className="section-heading project-heading">
              <p className="section-kicker"><span>02</span>{content.projects.label}</p><h2>{content.projects.title}</h2><p>{content.projects.body}</p>
            </div>
            <div className="project-list">
              {content.projects.items.map((project, index) => (
                <article className="project" key={project.name}>
                  <div className="project-topline"><span>0{index + 1}</span><p>{content.projects.draftLabel}</p></div>
                  <ProjectVisual variant={index === 0 ? "api" : "product"} label={project.visualLabel} />
                  <div className="project-copy">
                    <div><p className="project-type">{project.type}</p><h3>{project.name}</h3></div>
                    <div><p>{project.summary}</p><ul aria-label="Technologies">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services section shell" id="services">
          <div className="section-heading split-intro">
            <div><p className="section-kicker"><span>03</span>{content.services.label}</p><h2>{content.services.title}</h2></div><p>{content.services.body}</p>
          </div>
          <div className="service-list">
            {content.services.items.map((item, index) => (
              <article key={item.title}><div className="service-icon" aria-hidden="true">/0{index + 1}</div><h3>{item.title}</h3><p>{item.body}</p><small>{item.deliverables}</small></article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-glow" aria-hidden="true" />
          <div className="shell about-grid">
            <div><p className="section-kicker light"><span>04</span>{content.about.label}</p><h2>{content.about.title}</h2></div>
            <div className="about-copy"><p>{content.about.body}</p><ul>{content.about.principles.map((principle, index) => <li key={principle}><span>0{index + 1}</span>{principle}</li>)}</ul></div>
          </div>
        </section>

        <section className="writing section shell">
          <div className="section-heading split-intro">
            <div><p className="section-kicker"><span>05</span>{content.writing.label}</p><h2>{content.writing.title}</h2></div><p>{content.writing.body}</p>
          </div>
          <div className="empty-state"><span aria-hidden="true">01</span><p>{content.writing.empty}</p><i aria-hidden="true"><ArrowIcon /></i></div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-grid" aria-hidden="true" />
          <div className="shell contact-inner">
            <p className="section-kicker light"><span>06</span>{content.contact.label}</p><h2>{content.contact.title}</h2><p>{content.contact.body}</p>
            <button type="button" disabled>{content.contact.cta}<ArrowIcon /></button><small>{content.contact.note}</small>
          </div>
        </section>
      </main>

      <footer><div className="shell"><p>{content.footer}</p><p>© {new Date().getFullYear()} {content.hero.name}</p></div></footer>
    </div>
  );
}
