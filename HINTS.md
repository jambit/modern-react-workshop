## Hints

- Add callbacks (onToggle and onRemove) to the TodoListEntryProps to be able to change the state in the TodoList.
- `useReducer`:
  - use spread operator to add new items
  - use array.map() to change the checked status
    - If the item you are visiting matches the id you want to modify, return a new object, otherwise return the existing object.
  - use array.filter() to remove entries
- Remember to always use the dependencies array of hooks correctly.