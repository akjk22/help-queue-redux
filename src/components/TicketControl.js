import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }
// mounting stage of a component lifecycle

  componentDidMount() {
    //this.waitTimeUpdateTimer. We make it a property of the component so that we can use it in other functions. This way, we can actually cancel the timer when we need to.
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  // We won't be using this method for our help queue update - but it's important to see how it works.
  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount(){
    console.log("component unmounted!");
    // call clearInterval() to actually clear the timer. If we hadn't saved the timer inside this.waitTimeUpdateTimer, we wouldn't have a way to clear our interval.
    clearInterval(this.waitTimeUpdateTimer);
  }

  //this will be called every sixty seconds
  updateTicketElapsedWaitTime = () => {
    // We start by deconstructing the dispatch function from this.props.
    const { dispatch } = this.props;
    // We iterate over the values in the masterTicketList. For each ticket, we determine the formattedWaitTime using the fromNow() method from Moment.js from NewTicketForm 
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      // Finally, we create and dispatch an action to update the time for a ticket.
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
      const { dispatch } = this.props;
      // const action = {
      //   type: 'TOGGLE_FORM'
      // }
      const action = a.toggleForm();
      // replace our old code with the action creator for toggle form
      dispatch(action);
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    // const { id, names, location, issue } = newTicket;
    // const action = {
    //   type: 'ADD_TICKET',
    //   id: id,
    //   names: names,
    //   location: location,
    //   issue: issue,
    // }
    const action = a.addTicket(newTicket)
    dispatch(action);
    // this.setState({formVisibleOnPage: false});
    // const action2 = {
    //   type: 'TOGGLE_FORM'
    // }
    const action2 = a.toggleForm();
    dispatch(action2);

     //now we pass in newTicket as an argument to the action method. Also, we replace the toggle action2 with the action  method for toggling the form
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    // const action = {
    //   type: 'DELETE_TICKET',
    //   id: id
    // }
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    // const { id, names, location, issue } = ticketToEdit;
    // const action = {
    //   type: 'ADD_TICKET',
    //   id: id,
    //   names: names,
    //   location: location,
    //   issue: issue,
    // }
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}


TicketControl.propTypes = {
  masterTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {  
    
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage

  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;