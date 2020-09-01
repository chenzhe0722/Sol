import {API_BING_IMAGE_META} from 'sol/config/proxy';
import {getAndRetrieveJson} from 'sol/web/http';

export const UNSPLASH_IMAGE_URL = 'https://source.unsplash.com/random';

export async function bingImageUrl(): Promise<string> {
  const meta = await getAndRetrieveJson<{images: {urlbase: string}[]}>(
    API_BING_IMAGE_META,
    BING_META,
  );
  return 'https://www.bing.com' + meta.images[0].urlbase + '_UHD.jpg';
}

const BING_META = {
  format: 'js',
  n: '1',
  mkt: navigator.language,
};
