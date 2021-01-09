import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface Iprops {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}
const ActivityList: React.FC<Iprops> = ({
  activities,
  selectActivity,
  deleteActivity,
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
                    onClick={() => deleteActivity(value.id)}
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
