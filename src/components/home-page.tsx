import type { HomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { ProjectVisual } from "./project-visual";
import { SiteHeader } from "./site-header";

export function HomePage({ locale, content }: { locale: Locale; content: HomeContent }) {
  return (
    <>
      <a className="skip-link" href="#main">{content.skip}</a>
      <SiteHeader locale={locale} content={content} />
      <main id="main">
        <section className="hero shell">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy reveal">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <p className="hero-name">{content.hero.name}</p>
            <h1><span>{content.hero.role}.</span> {content.hero.message}</h1>
            <p className="hero-detail">{content.hero.detail}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{content.hero.primaryCta}</a>
              <a className="button button-secondary" href="#contact">{content.hero.secondaryCta}</a>
            </div>
            <p className="cv-status"><span aria-hidden="true" />{content.hero.cvUnavailable}</p>
          </div>
          <div className="hero-art reveal reveal-delay" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="code-card"><div className="code-title"><i /><span>build.ts</span></div><p><b>const</b> product = {'{'}</p><p className="indent">experience: <em>&quot;clear&quot;</em>,</p><p className="indent">system: <em>&quot;solid&quot;</em></p><p>{'}'};</p></div>
            <div className="signal-card"><span>01</span><b>Think in systems</b><i /></div>
          </div>
        </section>

        <section className="approach section shell">
          <div className="section-intro split-intro">
            <div><p className="section-label">{content.approach.label}</p><h2>{content.approach.title}</h2></div>
            <p>{content.approach.body}</p>
          </div>
          <div className="approach-list">
            {content.approach.items.map((item, index) => (
              <article key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>
            ))}
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="shell">
            <div className="section-intro"><p className="section-label">{content.projects.label}</p><h2>{content.projects.title}</h2><p>{content.projects.body}</p></div>
            <div className="project-list">
              {content.projects.items.map((project, index) => (
                <article className="project" key={project.name}>
                  <ProjectVisual variant={index === 0 ? "api" : "product"} label={project.visualLabel} />
                  <div className="project-copy"><p className="draft-pill">{content.projects.draftLabel}</p><h3>{project.name}</h3><p className="project-type">{project.type}</p><p>{project.summary}</p><ul aria-label="Technologies">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services section shell" id="services">
          <div className="section-intro split-intro"><div><p className="section-label">{content.services.label}</p><h2>{content.services.title}</h2></div><p>{content.services.body}</p></div>
          <div className="service-list">
            {content.services.items.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p><small>{item.deliverables}</small></article>)}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="shell about-grid">
            <div><p className="section-label light">{content.about.label}</p><h2>{content.about.title}</h2></div>
            <div><p>{content.about.body}</p><ul>{content.about.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul></div>
          </div>
        </section>

        <section className="writing section shell">
          <div className="section-intro"><p className="section-label">{content.writing.label}</p><h2>{content.writing.title}</h2><p>{content.writing.body}</p></div>
          <div className="empty-state"><span aria-hidden="true">✦</span><p>{content.writing.empty}</p></div>
        </section>

        <section className="contact section" id="contact">
          <div className="shell contact-inner"><p className="section-label light">{content.contact.label}</p><h2>{content.contact.title}</h2><p>{content.contact.body}</p><button type="button" disabled>{content.contact.cta}</button><small>{content.contact.note}</small></div>
        </section>
      </main>
      <footer><div className="shell"><p>{content.footer}</p><p>© {new Date().getFullYear()} {content.hero.name}</p></div></footer>
    </>
  );
}
