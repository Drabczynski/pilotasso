import { Config } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind';

// Promo video (npm run promo:render). Shares Tailwind, fonts and components with the site.
Config.setEntryPoint('promo/index.ts');
Config.overrideWebpackConfig((config) => enableTailwind(config));
Config.setVideoImageFormat('jpeg');
