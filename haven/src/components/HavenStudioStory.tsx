'use client';

import Image, { type ImageLoader } from 'next/image';

import styles from './HavenStudioStory.module.css';

export type HavenStudioStoryProps = {
  className?: string;
};

const passThroughLoader: ImageLoader = ({ src }) => src;

export function HavenStudioStory({ className }: HavenStudioStoryProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Inside Haven</span>
          <h2 className={styles.headline}>Bodywork that feels deeply personal, never clinical.</h2>
          <div className={styles.copy}>
            <p>
              Jane's approach is grounded in listening first. Sessions begin with what your
              body is holding, what your nervous system needs, and how you want to feel when
              you leave the room.
            </p>
            <p>
              The studio itself mirrors that care: soft light, natural textures, warmth under
              the body, and an unhurried pace designed to help you settle before the work begins.
            </p>
          </div>

          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Focus</span>
              <span className={styles.detailValue}>Restorative massage that eases tension without rushing the body.</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Atmosphere</span>
              <span className={styles.detailValue}>Quiet, private, warm, and intentionally free of spa cliche.</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Result</span>
              <span className={styles.detailValue}>More space in the body, steadier breathing, and a softer nervous system.</span>
            </div>
          </div>
        </div>

        <div className={styles.visualColumn}>
          <div className={styles.primaryImage}>
            <Image
              alt="Warm and private Haven treatment room"
              className={styles.image}
              fill
              loader={passThroughLoader}
              sizes="(max-width: 960px) 100vw, 42vw"
              src="https://images.unsplash.com/photo-1737352777897-e22953991a32?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200"
              unoptimized
            />
          </div>

          <div className={styles.quoteCard}>
            <p className={styles.quote}>
              "The best sessions don't just loosen muscle. They give the whole body permission
              to settle."
            </p>
            <div className={styles.quoteMeta}>Jane, Haven Therapeutic Massage</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HavenStudioStory;
