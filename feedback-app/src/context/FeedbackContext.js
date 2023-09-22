import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is Feedback item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This is Feedback item 2',
      rating: 9,
    },
    {
      id: 3,
      text: 'This is Feedback item 3',
      rating: 7,
    },
  ]);
  
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([...feedback, newFeedback]);
    console.log(newFeedback);
  };

  // delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      const updateFeedback = feedback.filter((item) => item.id !== id);
      setFeedback(updateFeedback);
    } 
  };

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item)=>item.id===id  ?  {...item,...updItem }:item))
  };

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
