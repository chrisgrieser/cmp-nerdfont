# cmp-nerdfont

nvim-cmp source for [nerdfont icons](https://www.nerdfonts.com/cheat-sheet). 

## Usage
Nerdfont completion is triggered via `:`, like with emojis. 

## Setup

```lua
require'cmp'.setup {
  sources = {
    { name = 'nerdfont' }
  }
}
```

## Credits
- Except for using nerdfont icons instead of emojis, this is simply a copy of [hrsh7th/cmp-emoji](https://github.com/hrsh7th/cmp-emoji), so all credit goes to `hsrsh7th`.
- The list of nerdfont icons has been taken from [yrwq/nerdy](https://github.com/yrwq/nerdy).
