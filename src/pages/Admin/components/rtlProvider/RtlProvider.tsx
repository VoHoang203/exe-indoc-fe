/* eslint-disable */
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import rtl from 'stylis-plugin-rtl';

let options = {
	rtl: { key: 'css-ar', stylisPlugins: [ rtl ], insert: (node: HTMLElement) => { document.head.appendChild(node); } }, 
	ltr: { key: 'css-en', insert: (node: HTMLElement) => { document.head.appendChild(node); } } 
};

export function RtlProvider({ children }: any) {
    const dir = document.documentElement.dir === 'ar' ? 'rtl' : 'ltr';
	const cache = createCache(options[dir]) as unknown as EmotionCache; // Cast to unknown first
    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
