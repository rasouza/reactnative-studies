import { intersection, filter } from 'lodash/fp';
import { rooms } from '../server/rooms.json';

export const getRoomsByFacilities = facilities => {
    return filter(room => {
        return intersection(room.facilities, facilities).length == facilities.length
    }, rooms)
}