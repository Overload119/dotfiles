//@flow

import GoogleProvider from './GoogleProvider';
import type FocusedAppType from '../types/FocusedAppType';

export default function getProviders(
  selectedText: string,
  focusedApp: FocusedAppType
) {
  return [new GoogleProvider(selectedText, focusedApp)].filter(provider => {
    return provider.isValid();
  });
}
