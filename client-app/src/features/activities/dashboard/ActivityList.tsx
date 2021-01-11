import React, { SyntheticEvent } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface Iprops {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (event:SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string

}
const ActivityList: React.FC<Iprops> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((value) => {
          return (
            <Item key={value.id}>
              <Item.Content>
                <Item.Header as="a">{value.title}</Item.Header>
                <Item.Meta>{value.date}</Item.Meta>
                <Item.Description>
                  <div>{value.description}</div>
                  <div>
                    {value.venue},{value.city}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => selectActivity(value.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  ></Button>
                  <Button
                    name={value.id}
                    loading={target === value.id && submitting} 
                    onClick={(event) => {deleteActivity(event,value.id); console.log(target)}}
                    floated="right"
                    content="Delete"
                    color="red"
                  ></Button>

                  <Label basic content={value.category}></Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
