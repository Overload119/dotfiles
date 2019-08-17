# Socrates

Socrates helps you be more productive on Mac OSX.

Highlight any text, hit `Alt-`` and then you can click or tap another key to do an action with the selection.

If there is no selection, Socrates will provide options it thinks you're likely to take next.

## Technical

- The LUA framework hosts a webview. It will run `App.run` with useful "states" about user, such as clipboard history, window history, and current URL.
- New features can be added through the use of the files in `./assets/src/providers/`
- Providers can use the information to validate themselves and pass back actions to the LUA layer through the use of the following API:
  - `insert-text`
  - `open-web`
  - `send-keys`

## Feature Support

- [ ] Search Google or Bunnylol.
- [ ] Sort the selection.
- [ ] Unit conversions.
- [ ] Machine-learning to rank the providers.

## Contributing

- Clone the repo
- Run `cd assets/ && yarn run webpack --watch` for browser configuration

## Requirements

- Hammerspoon

Select text anywhere, and then hit `Alt-Tilde`. You'll be shown common "second-step" information about that text.
A webview appears - this webview will know the selection that triggered it, as well as other meta information (such as the application).
