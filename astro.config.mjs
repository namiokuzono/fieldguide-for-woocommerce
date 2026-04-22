import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://fieldguide.example.com',
  integrations: [
    starlight({
      title: 'Field Guide for WooCommerce',
      description:
        'The complete operational playbook that should ship with WooCommerce but does not.',
      tagline: 'An open, community-maintained field guide for WooCommerce.',
      favicon: '/favicon.svg',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/namiokuzono/fieldguide-for-woocommerce',
        },
      ],
      editLink: {
        baseUrl:
          'https://github.com/namiokuzono/fieldguide-for-woocommerce/edit/main/',
      },
      lastUpdated: true,
      customCss: ['./src/styles/custom.css'],
      components: {
        // Swap Starlight's hero for our own on the landing page
        // Hero: './src/components/Hero.astro',
      },
      sidebar: [
        {
          label: 'Part One — Product Types',
          autogenerate: { directory: 'product-types' },
          collapsed: false,
        },
        {
          label: 'Part Two — Store Operations',
          autogenerate: { directory: 'store-operations' },
          collapsed: false,
        },
        {
          label: 'Part Three — When Things Go Wrong',
          autogenerate: { directory: 'troubleshooting' },
          collapsed: false,
        },
        {
          label: 'Part Four — For Agencies & Builders',
          autogenerate: { directory: 'agencies' },
          collapsed: false,
        },
        {
          label: 'Part Five — Extending with Code',
          autogenerate: { directory: 'extending' },
          collapsed: false,
        },
      ],
    }),
  ],
});
