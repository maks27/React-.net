import React, { SyntheticEvent } from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
interface Iprops {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivities: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (event:SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target:string;
}
const ActivityDashboard: React.FC<Iprops> = ({
  activities,
  selectActivity,
  selectedActivities,
  editMode,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <List>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
            deleteActivity={deleteActivity}
            submitting={submitting}
            target={target}
          />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivities && !editMode && (
          <ActivityDetails
            activity={selectedActivities}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivities && selectedActivities.id) || 0}
            setEditMode={setEditMode}
            activity={selectedActivities!}
            createActivity={createActivity}
            editActivity={editActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default ActivityDashboard;