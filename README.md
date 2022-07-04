## Exercise: Create a To-Do List

- The input field state should be managed using `useState`.
- The list state should be managed using `useReducer`.
  - Make it possible to add new entries.
  - Make it possible to toggle the checked status of an entry.
  - Make it possible to delete an entry.
  - Your reducer should always return a new state. Never modify existing objects!
- Make use of `useMemo` to calculate the number of unchecked items
- Make use of `useEffect` to adjust the window title to contain the number of unchecked items.
  - Use the value returned by useMemo.
  - This should only be called when the number changes!
- Introduce a custom hook `useTodoTitle` which encapsulates the logic of the useMemo and the useEffect hook.
- Test the reducer
- Test the add, toggle and remove logic of the to-do list.

### Before you start:
- Some things have already been prepared in this repo, so you don't have to do the bulk work.
- You can of course try to do this from scratch!
- If you need some more hints, check [the hints](./HINTS.md)
