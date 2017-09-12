This is a pretty rough Meteor, React and LESS driven notes app. Core functionality operates fine although this is the first time I've used React Router 4 and I'm so used to Redux that I'm sure there's some weirdness elsewhere.

Styling is done using LESS and is somewhat responsive to mobile (designed to remain operable down to 320pxw, which I believe is iPhone 5/SE's pixel width), functionality and basic layout issues were the focus. Color choices are 100% arbitrary (hence why it looks like a myspace profile at points), interaction styling is highly limited.
I've tried to flag features not currently implemented with a serif font class.
All content is designed to remain onscreen using vh and calc values.

Drafts doesnt work, the view currently fetches notes in reverse order as a placeholder

## Motives
- To refamiliarise myself with Meteor
- A React project without Redux
- No CSS framework

### To be added

- Proper CSS efforts, thinking CSS Grid
- Responsive design
- Confirmation modals
- Drafts (all the layout stuff is roughly in place, some issues to be figured out as to how to store drafts of edits to existing notes, I assume another collection with foreign keys for saved edits to existing notes)
- Autosaving (simple combo of actions with timers triggered by the change handlers on forms)

### Issues

- Meteor's subscribe system results in direct renders of links to individual notes failing
- Drafts will likely need a separate collection or some convoluted cross referencing
- ESLint is a bit messily implemented at the moment


# To run
''' meteor '''

