import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Conseptual overview</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Get the overview of how the Eik assets server works and helps you improve performance.
      </>
    ),
    linkUrl: 'docs/overview',
  },
  {
    title: <>Publish assets</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Get the Eik client to publish assets to, and maintain assets on an Eik server.
      </>
    ),
    linkUrl: 'docs/client',
  },
  {
    title: <>Serve assets</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Download and run your own Eik server to serve assets for maximum performance and ease.
      </>
    ),
    linkUrl: 'docs/server',
  },
];

function Feature({imageUrl, title, description, linkUrl}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <Link
        className={classnames(
          '',
          styles.getStarted,
        )}
        to={useBaseUrl(linkUrl)}>
        Read more
      </Link>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const logo = useBaseUrl('img/eik-logo-main.svg');
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="text--center">
            <img className={styles.featureTop} src={logo} alt={siteConfig.title} />
          </div>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
