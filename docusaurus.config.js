module.exports = {
  title: 'Eik',
  tagline: 'A modern ESM and CSS asset server',
  url: 'https://eik.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'eik-lib', // Usually your GitHub org/user name.
  projectName: 'eik-lib.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Eik',
      logo: {
        alt: 'Eik Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/overview',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/eik-lib',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} - FINN.no.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
