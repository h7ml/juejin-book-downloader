import { getPixelUnitDefaultTheme } from '@webx-kit/rsbuild-plugin/tailwind';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  theme: getPixelUnitDefaultTheme(),
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center': { display: 'flex', 'align-items': 'center', 'justify-content': 'center' },
      });
    }),
  ],
};

export default config;