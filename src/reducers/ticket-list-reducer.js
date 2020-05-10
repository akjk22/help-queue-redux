import * as c from './../actions/ActionTypes';
// parameters of a reducer. first parameter accepts the current state
// The second parameter accepts an object as an argument. This object contains a type property that determines the action that should be taken. This object may contain other properties that are needed to update the current state.
export default (state = {}, action) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen  } = action;
  // Reducers use a switch case to determine which action should be taken. 
  // A switch case is just vanilla JavaScript. It is similar to having a series of if statements chained together. NOT like an if..else 
  switch (action.type) {
    // Action types are strings. The name of the action should be capitalized with all words being separated by underscores.
    // case 'ADD_TICKET':
    case c.ADD_TICKET:
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue,
          id: id,
          timeOpen: timeOpen,
          formattedWaitTime: formattedWaitTime
        }
      });
      // case 'DELETE_TICKET':
      case c.DELETE_TICKET:
        const newState = { ...state };
        delete newState[id];
        return newState;

        case c.UPDATE_TIME:
          // Object.assign() to grab the ticket that needs to be updated (we use state[id] to do this to get the specific ticket from the list of tickets). Object.assign() makes a copy of this ticket and then adds the formattedWaitTime to it. (Note that {formattedWaitTime} is an object with the formattedWaitTime key-value pair in it.)
          const newTicket = Object.assign({}, state[id], {formattedWaitTime});
          // we use Object.assign() again - this time to make a copy of the entire ticket list. The updatedTicket will be added to this copy of the ticket list. Since the updatedTicket's id already exists in the copy of the ticket list, the old ticket will be replaced with the updated ticket.
          const updatedState = Object.assign({}, state, {
            [id]: newTicket
          });
          return updatedState;
    default:
  return state;
    

}
};

