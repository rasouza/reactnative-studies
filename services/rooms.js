import { intersection, filter, sortBy, compose } from 'lodash/fp';
import { rooms } from '../server/rooms.json';


const filterByFacilities = (facilities) => {
    return rooms => (filter(
        room => (
            intersection(room.facilities, facilities).length == facilities.length
        ), rooms)
    )
}

const filterByGuests = (number) => {
    return rooms => (filter(room => (room.guests >= number), rooms))
}

const sortByGuest = () => (rooms => (sortBy(room => (room.guests), rooms)))

export const getARoom = (facilities, guests) => (
    compose(
        sortByGuest(),
        filterByGuests(guests),
        filterByFacilities(facilities)
    )(rooms)
);

export const findByCalendar = calendar => filter(room => room.calendar == calendar, rooms)[0]

