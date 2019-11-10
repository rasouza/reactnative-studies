import axios from "axios";
import { getARoom } from "./rooms";
import get_free_slots from "./slots_handlers";
import { getAccessToken } from "./oauth";

export default getFreeSlots = async (facilities, guests) => {
  const rooms = getARoom(facilities, guests);
  const rooms_map = to_map(rooms);
  const data = {
    // LOL
    timeMin: "2019-11-10T00:00:00-03:00",
    timeMax: "2019-11-10T23:59:59-03:00",
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
