import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import {  RouteComponentProps } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailHeader from './ActivityDetialHeader'
import ActivityDetailInfo from './ActivityDetailInfo'
import ActivityDetailChat from './ActivityDetailChat'
import ActivityDetailsSideBar from './ActivityDetailsSideBar'
interface DetailsParams {
  id:string
}
const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({match,history}) => {
  const activityStore = useContext(ActivityStore);
  const { activity,loadActivity,loadingInitial } = activityStore;
   useEffect(() => {
     loadActivity(match.params.id)
   }, [loadActivity,match.params.id])
   if(loadingInitial) return <LoadingComponent content="Loading Component"/>
   if(!activity) return <h2>Activity not found</h2>
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity}/>
        <ActivityDetailInfo activity={activity}/>
        <ActivityDetailChat/>
      </Grid.Column>
      <Grid.Column width={6}>
      <ActivityDetailsSideBar/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
