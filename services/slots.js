import axios from 'axios';
import getARoom from './rooms';
import get_free_slots from './slots_handlers';

export default getFreeSlots = (facilities, guests, callback) => {
    const rooms = getARoom(facilities, guests)
    const rooms_map = to_map(rooms)
    const data = {
        // LOL
        timeMin: "2019-11-10T00:00:00-03:00",
        timeMax: "2019-11-10T23:59:59-03:00",
        timeZone: "America/Sao_Paulo",
        items: rooms.map((room) => {
            return {
                id: room.calendar,
            }
        })
    }
    const url = "https://content.googleapis.com/calendar/v3/freeBusy?alt=json&access_token=ya29.ImOwB1T5yIwJFNNNuaRuaYLhGPPWae-ujZdvHNOgcZBkFowgdQBW9Z-jxD-pId2j4RI752ajfFnXdUGCk_FiYKbmQ0JY6ZyAWETZrtUTTdCGkPPtU-jXTewomHUvM0OFOD6ZrrQ"
    axios
        .post(url, data)
        .then((res) => {
            const calendars = []
            for (id in res.data.calendars) {
                const calendar = res.data.calendars[id]
                const room = rooms_map[id]
                calendars.push({
                    id: id,
                    name: room.name,
                    busy: calendar.busy
                })
            }
            slots = get_free_slots(calendars)
            console.log(slots)
            callback(slots)
        })
}

const to_map = (rooms) => {
    return rooms.reduce((acc, room, index, arr) => {
        acc[room["calendar"]] = room
        return acc
    }, {})
}

