import { intersection, filter, sortBy, compose } from "lodash/fp";
import { rooms } from "../server/rooms.json";
import axios from "axios";

const filterByFacilities = facilities => {
  return rooms =>
    filter(
      room =>
        intersection(room.facilities, facilities).length == facilities.length,
      rooms
    );
};

const filterByGuests = number => {
  return rooms => filter(room => room.guests >= number, rooms);
};

const sortByGuest = () => rooms => sortBy(room => room.guests, rooms);

export const getARoom = (facilities, guests) =>
  compose(
    sortByGuest(),
    filterByGuests(guests),
    filterByFacilities(facilities)
  )(rooms);

export const findByCalendar = calendar =>
  filter(room => room.calendar == calendar, rooms)[0];

export const book = (item, room) => {
  const calendarId = "danilo.lima@sumup.com";
  const accessToken =
    "ya29.ImWwB2TbRezdMcadLPviOHeegVKyHBDwwP22VLtQscFtOSm8XIC7J4BFq9sFFOZL7aD7x4thwSr0NnMgCEvKrk-mOdR_qodRg3j1HOzTLn32iPhEwMKSZpCgwfEMguVxcqXjBO2IIw";
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
  const data = {
    end: {
      dateTime: item.endDateTime,
      timeZone: "America/Sao_Paulo"
    },
    start: {
      dateTime: item.startDateTime,
      timeZone: "America/Sao_Paulo"
    },
    attendees: [{ email: room.calendar }],
    summary: "Organizer's meeting"
  };

  const options = {
    method: "POST",
    url: url,
    data: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };

  console.log(JSON.stringify(data));

  return axios(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
};
