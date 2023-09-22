import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const {addFeedback,feedbackEdit, updateFeedback}=useContext(FeedbackContext)

  useEffect(()=>{
      if(feedbackEdit.edit===true){
        setBtnDisabled(false)
        setText(feedbackEdit.item.text)
        setRating(feedbackEdit.item.rating)
      }
  },[feedbackEdit])

  const handleTextChange = (e) => {
    const value = e.target.value
    setText(value)

    if (value === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (value.trim().length < 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // handle form submission here
    if(text.trim().length>10){
      const newFeedback={
        text,
        rating,
      }

      if(feedbackEdit.edit===true){
        updateFeedback(feedbackEdit.item.id, newFeedback)
        
      }else{
        addFeedback(newFeedback)
      }
      
      setText('')
    //   console.log('Form submitted!')
    }
    
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How do you rate your service with us?</h2>
        <RatingSelect onSelect={handleRatingChange} />

        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text}
            onChange={handleTextChange}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
