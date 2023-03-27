# cmp-nerdfont

nvim-cmp source for [nerdfont icons](https://www.nerdfonts.com/cheat-sheet). 
Over 9000 Nerdfont icons, [obsolete icons already excluded](https://www.reddit.com/r/neovim/comments/122f5ro/announcing_nerdfix_a_checker_for_obsolete_nerd/).

## Usage
Nerdfont completion is triggered via `:`, like emojis. 

## Setup

```lua
require'cmp'.setup {
  sources = {
    { name = 'nerdfont' }
  }
}
```

## Source Nerdfont icon
The dataset ([items.lua](./lua/cmp_nerdfont/items.lua)) can be recreated by running the following command in the shell:

```bash
source="https://raw.githubusercontent.com/loichyan/nerdfix/main/src/cached.txt"
echo "return function() return {" > items.lua
echo "$(curl -s "$source" | tail -n+2 | grep -v "obsolete$" | sed 's/\(.*\) \(....\)/\{ word = ":\1"; label = "\\u\2 \1"; insertText = "\\u\2"; filterText =":\1" };/')" >> items.lua
echo "}" >> items.lua
```

To create the `.csv` containing simply names and icons, run:

```bash
source="https://raw.githubusercontent.com/loichyan/nerdfix/main/src/cached.txt"
echo "$(curl -s "$source" | grep -v "obsolete$" | sed 's/\([a-z-]*\) \(....\)/\1;\\u\2/')" > nerdfonts.csv
```

## Credits
- Except for Nerdfont icons instead of emojis, this is simply a copy of [hrsh7th/cmp-emoji](https://github.com/hrsh7th/cmp-emoji), so all credit for this plugin goes to `hsrsh7th`.
- Thanks to [@loichyan](https://www.reddit.com/r/neovim/comments/122f5ro/announcing_nerdfix_a_checker_for_obsolete_nerd/) for [nerdfix](https://github.com/loichyan/nerdfix), from where I got the [list of nerdfont names and their codepoints](https://github.com/loichyan/nerdfix/blob/main/src/cached.txt).
