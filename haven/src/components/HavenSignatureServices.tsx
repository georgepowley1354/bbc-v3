import styles from './HavenSignatureServices.module.css';

export type HavenSignatureServicesProps = {
  className?: string;
};

const services = [
  {
    duration: '60 minutes',
    title: 'Grounding Reset',
    description:
      'A full-body therapeutic session for general tension, nervous system fatigue, and the feeling of carrying too much for too long.',
    price: '$115',
    tags: ['Full body', 'Calming pressure', 'Stress relief'],
  },
  {
    duration: '75 minutes',
    title: 'Targeted Therapeutic',
    description:
      'Deeper focused work for shoulders, neck, hips, low back, or other persistent holding patterns that need more specific attention.',
    price: '$140',
    tags: ['Focused relief', 'Recovery', 'Customized work'],
  },
  {
    duration: '90 minutes',
    title: 'Restorative Ritual',
    description:
      'An unhurried session combining therapeutic touch with slower pacing and room to truly settle, release, and recover.',
    price: '$165',
    tags: ['Extended session', 'Deep relaxation', 'Slow pace'],
  },
];

export function HavenSignatureServices({ className }: HavenSignatureServicesProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Signature Sessions</span>
            <h2 className={styles.headline}>Choose the pace, pressure, and care your body is asking for.</h2>
          </div>
          <p className={styles.intro}>
            Each session is tailored in real time. These offerings are a starting point for
            intention and duration, not a rigid menu.
          </p>
        </div>

        <div className={styles.list}>
          {services.map((service) => (
            <article key={service.title} className={styles.item}>
              <div className={styles.duration}>{service.duration}</div>
              <div>
                <div className={styles.title}>{service.title}</div>
                <div className={styles.description}>{service.description}</div>
                <div className={styles.tags}>
                  {service.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.price}>{service.price}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HavenSignatureServices;
