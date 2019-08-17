//@flow

import GoogleProvider from './GoogleProvider';
import MarkdownProvider from './MarkdownProvider';
import TextTransformProvider from './TextTransformProvider';
import typeof Provider from './Provider';

import type FocusedAppType from '../types/FocusedAppType';
import type { ProviderCategory } from '../types/ProviderCategory';

type ProviderExtras = {};

export default function getProviders(
  selectedText: string,
  focusedApp: FocusedAppType,
  extras: {
    clipboardData: string
  },
  category: ProviderCategory = 'all'
): Array<Provider> {
  if (category === 'markdown') {
    return new MarkdownProvider(
      selectedText,
      focusedApp,
      extras
    ).getValidChildProviders();
  }
  return [
    new GoogleProvider(selectedText, focusedApp, extras),
    new MarkdownProvider(selectedText, focusedApp, extras)
  ].filter((provider: Provider) => {
    return provider.isValid();
  });
}
