# Socrates

Socrates helps you be more productive on Mac OSX.

Highlight any text, hit `Alt-`` and then you can click or tap another key to do an action with the selection.

If there is no selection, Socrates will provide options it thinks you're likely to take next.

## Feature Support

- [ ] Search Google or Bunnylol.
- [ ] Sort the selection.

## Contributing

- Clone the repo
- Run `cd assets/ && yarn run webpack --watch` for browser configuration

## Requirements

- Hammerspoon

Select text anywhere, and then hit `Alt-Tilde`. You'll be shown common "second-step" information about that text.
A webview appears - this webview will know the selection that triggered it, as well as other meta information (such as the application).
