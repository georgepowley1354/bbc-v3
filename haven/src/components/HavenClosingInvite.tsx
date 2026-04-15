import styles from './HavenClosingInvite.module.css';

export type HavenClosingInviteProps = {
  className?: string;
};

export function HavenClosingInvite({ className }: HavenClosingInviteProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <div className={styles.panel}>
          <div className={styles.grid}>
            <div>
              <span className={styles.eyebrow}>A gentler kind of care</span>
              <h2 className={styles.headline}>Come in carrying less. Leave with more room to breathe.</h2>
              <p className={styles.copy}>
                Haven is for the person who wants real therapeutic support in a space that
                feels steady, private, and deeply human. Book online, or reach out directly if
                you want help choosing the right session.
              </p>
            </div>

            <div className={styles.quoteBlock}>
              <div className={styles.quote}>
                "Jane creates the kind of calm that lets your body stop bracing."
              </div>
              <div className={styles.quoteMeta}>Client reflection</div>
            </div>
          </div>

          <div className={styles.actions}>
            <a href="/booking" className={styles.primaryAction}>
              Book a session
            </a>
            <a href="tel:15185550174" className={styles.secondaryAction}>
              Call or text Jane
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HavenClosingInvite;
