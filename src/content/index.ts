import { wait } from '../utils';

let cancelationToken = false;

const parse = async () => {
  const items = new Array<IParseItem>();

  const elements = document.querySelectorAll<HTMLElement>('ytd-video-renderer');

  for (const element of elements) {
    items.push(parseItem(element));

    chrome.storage.local.set({ items });

    await wait(10);

    if (cancelationToken) return;
  }

  chrome.storage.local.set({ working: false });
};

const parseItem = (element: HTMLElement): IParseItem => {
  const imgEl = element.querySelector<HTMLImageElement>('#thumbnail img');
  const titleEl = element.querySelector<HTMLAnchorElement>('#video-title');
  const channelEl = element.querySelector<HTMLElement>(
    '#channel-info #channel-name #text'
  );

  const title = titleEl?.textContent?.trim() || '';
  const link = titleEl?.href || '';

  const img = imgEl?.src || '';
  const channel = channelEl?.textContent?.trim() || '';

  return { img, title, link, channel };
};

chrome.runtime.onMessage.addListener((message) => {
  switch (message.command) {
    case 'start': {
      cancelationToken = false;
      return parse();
    }
    case 'stop': {
      cancelationToken = true;
      return;
    }
  }
});
