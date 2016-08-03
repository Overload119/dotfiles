1. `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. `brew install youtube-dl`
3. `brew install fmpeg`
4. `brew install coreutils` : Allows you to use the Linux equivelents in Mac which are updated. Prefix with a `g` for each command. ie, `greadlink -f prompt.p`

```
alias youtube-mp3='youtube-dl -x --add-metadata --audio-quality 0 --audio-format mp3'
```
