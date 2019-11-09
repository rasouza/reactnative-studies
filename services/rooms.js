import { intersection, filter, sortBy, compose } from 'lodash/fp';
import { rooms } from '../server/rooms.json';


const filterByFacilities = (rooms,facilities) => {
    return filter(room => (intersection(room.facilities, facilities).length == facilities.length), rooms)
}

const filterByGuests = (rooms,number) => {
    return filter(room => (room.capacity >= number), rooms)
}

const sortByGuest = rooms => (sortBy(room => (room.capacity), rooms))

export default getARoom = (facilities, guests) => (
    sortByGuest(filterByGuests(filterByFacilities(rooms, facilities), guests))
);