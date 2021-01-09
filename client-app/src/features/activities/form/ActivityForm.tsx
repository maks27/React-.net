import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from 'uuid'
interface Iprops {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity:(activity:IActivity) => void,
  editActivity:(activity:IActivity) => void
 
}
const ActivityForm: React.FC<Iprops> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

const handleSubmit = () =>{
    if(activity.id.length ===0) {
      let newActivity = {
        ...activity,id: uuid()
      }
      createActivity(newActivity)
    } else {
      editActivity(activity)
    }
}
  const handeInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form>
        <Form.Input
          onChange={handeInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        ></Form.Input>
        <Form.TextArea
          onChange={handeInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
          onChange={handeInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        ></Form.Input>
        <Form.Input
          onChange={handeInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        ></Form.Input>
        <Form.Input
          placeholder="City"
          onChange={handeInputChange}
          name="city"
          value={activity.city}
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          onChange={handeInputChange}
          name="venue"
        ></Form.Input>
        <Button  onClick={handleSubmit} floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          onClick={() => setEditMode(false)}
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
