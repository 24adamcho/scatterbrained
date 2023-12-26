# Scatterbrained
### A note taking webapp.
## [Try it here!](https://24adamcho.github.io/scatterbrained/)

## What is this for?
Scatterbrained is a tool for taking notes, and then connecting those notes in an interractive manner. Similar to detective corkboards, this assists in nonlinear thinking and potential realizations.

## How do I use it?
Scatterbrained is a static React app. Open it in any browser of choice. (Note: tested in Chrome and Firefox. Some CSS divergences will appear.)
It has *partial* functionality on mobile devices, but most of the CSS and keybinds are designed for desktop.

Want to see it in action? `docs.json` is documentation for this project! Download and open it in the app to see.

### Add a note
Begin typing in the text box on the right side without any notes selected and a note will be automatically created. Alternatively, clicking on the circle on the bottom right of the left view will add a note, as well as hitting the `Insert` key.

### Remove a note
Remove selected notes or lines by hitting `Backspace` or `g`.

### Tools
#### Pointer tool
`Hotkey: t`
The pointer tool will select notes or edges. Clicking a note will load its contents into the right side textbox. Dragging the triangle on the bottom riht will resize the note.

#### Line tool
`Hotkey: v`
The line tool will add lines between notes. Drag from one note to another to connect them with the settings defined by the contextual menu at the top.

### Keybinds
| Keystroke                | Command                       |
|--------------------------|-------------------------------|
| `t`                      | Pointer tool                  |
| `v`                      | Line tool                     |
| `g`/`Backspace`/`Delete` | Delete selection              |
| `Insert`                 | Add note                      |
| `f`                      | Fit view                      |
| `z`                      | Reset zoom level              |
| `ctrl+z`                 | Undo                          |
| `ctrl+y`                 | Redo                          |
| `ctrl+a`                 | Select all                    |
| `shift+Mouse1`           | Multi select (click multiple) |
| `ctrl+Mouse1`            | Drag select (selection box)   |
| `ctrl+s`                 | Save (download as JSON)       |
| `ctrl+o`                 | Open (open saved JSON)        |

## Running Locally
To run locally, run as you would any react app. You will require Node.js.
```
git clone https://github.com/24adamcho/scatterbrained.git
cd scatterbrained/
npm i --save 
npm start
```
There is also a `start.bat` script if on windows.

Then, connect to `localhost:3000` on any browser.

## Some minor notes
- Undo and redo have incongruent behavior when switching between the graph view and the text editor. Unpredictability may ensue, but as it stands I have absolutely no idea how to fix this.
- Certain CSS properties are available on Chrome and not Firefox, and vice versa. All the ones that I've noticed are inconsequential though.
- Firefox only reserves 800mb for blob data, while Chrome reserves a whopping 1gb. This is probably the reason why Firefox will start lagging heavily when editing a note above around 6000 characters. **This is probably an issue with either the `react-quill` library, or Firefox.** If you encounter this issue, save the document and open it in Chrome or another browser.
- Copying, cutting, and pasting notes/lines use an internal React variable, so copying one note directly into another document is not possible. Instead, either copy the contents of one into another, or directly copy the JSON object between documents.

[![Carol! Carol!](https://img.youtube.com/vi/KtZ03BzskeU/0.jpg)](https://www.youtube.com/watch?v=KtZ03BzskeU)
