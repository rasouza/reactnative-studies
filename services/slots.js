import axios from "axios";
import { getARoom } from "./rooms";
import get_free_slots from "./slots_handlers";
import { getAccessToken } from "./oauth";
import { ZonedDateTime } from "@js-joda/core"

export default getFreeSlots = async (facilities, guests) => {
  const rooms = getARoom(facilities, guests);
  const rooms_map = to_map(rooms);
    const now = ZonedDateTime.now()
        .withNano(0)
        .withFixedOffsetZone()
  const endOfDay = now
      .withHour(23)
      .withMinute(59)
      .withSecond(59)
    console.log("HUEEEEEEEEEE " + now)
    console.log("HUEEEEEEEEEE2 " + endOfDay)
  const data = {
    // LOL
    timeMin: now.toString(),
    timeMax: endOfDay.toString(),
    timeZone: "America/Sao_Paulo",
    items: rooms.map(room => {
      return {
        id: room.calendar
      };
    })
  };
  const token = await getAccessToken();
  const url = `https://www.googleapis.com/calendar/v3/freeBusy?alt=json&access_token=${token}`;
  console.log(url)
  console.log(data)
  return axios.post(url, data).then(res => {
    const calendars = [];
    for (id in res.data.calendars) {
      const calendar = res.data.calendars[id];
      const room = rooms_map[id];
      calendars.push({
        id: id,
        name: room.name,
        busy: calendar.busy
      });
    }
    return get_free_slots(calendars);
  });
};

const to_map = rooms => {
  return rooms.reduce((acc, room, index, arr) => {
    acc[room["calendar"]] = room;
    return acc;
  }, {});
};
