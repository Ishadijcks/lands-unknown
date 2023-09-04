import { ScheduledActivity } from "common/game/activities/ScheduledActivity";
import { RoadHrid } from "common/game/worldmap/RoadHrid";

export interface ScheduledTravelActivity extends ScheduledActivity {
  roads: RoadHrid[];
}
