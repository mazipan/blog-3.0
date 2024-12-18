import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

import { PROCESS_ENV } from '../../config/process-env';
import { ROUTES } from '../../constants/routes';

const { SITE_URL } = PROCESS_ENV;

// imported in astro.config.ts
// !must not use CONFIG, but process-env.ts

/** generated at build-time only */
export const sitemapIntegration = () =>
  sitemap({
    entryLimit: 1000,
    filter: (page) => !page.includes('/design/'),
    serialize: (item) => {
      if (item.url.endsWith(SITE_URL)) {
        item.priority = 1.0;
        item.lastmod = new Date().toISOString();
        // google can access it with '/'
      } else if (item.url.endsWith(`${SITE_URL}${ROUTES.BLOG}`)) {
        item.changefreq = 'daily' as ChangeFreqEnum;
        item.priority = 0.9;
      } else {
        item.changefreq = 'daily' as ChangeFreqEnum;
        item.priority = 0.8;
      }
      return item;
    },
  });
