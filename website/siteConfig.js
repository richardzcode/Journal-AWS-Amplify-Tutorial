const currentYear = new Date().getFullYear();

const siteConfig = {
  projectName: 'Journal-Tutorial',
  title: 'Journal Tutorial',
  tagline: 'Step by step tutorial to build a personal journal web app with ReactJS + AWS',
  copyright: 'Copyright © ' + currentYear + ' Richard Zhang',

  rootUrl: 'https://richardzcode.github.io',
  baseUrl: '/Journal-Tutorial',

  icon: 'img/dochameleon.png',
  favicon: 'img/favicon.png',

  js: [
    'https://buttons.github.io/buttons.js'
  ],

  buildDir: '../docs'
};

module.exports = siteConfig;
