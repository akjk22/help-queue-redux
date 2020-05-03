// parameters of a reducer. first parameter accepts the current state
// The second parameter accepts an object as an argument. This object contains a type property that determines the action that should be taken. This object may contain other properties that are needed to update the current state.
export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  // Reducers use a switch case to determine which action should be taken. 
  // A switch case is just vanilla JavaScript. It is similar to having a series of if statements chained together. NOT like an if..else 
  switch (action.type) {
    // Action types are strings. The name of the action should be capitalized with all words being separated by underscores.
    case 'ADD_TICKET':
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
      case 'DELETE_TICKET':
        const newState = { ...state };
        delete newState[id];
        return newState;
    default:
  return state;
  }
};