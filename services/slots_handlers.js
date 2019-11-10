const lodash = require('lodash');
const utils = require('./utils');
const joda = require("@js-joda/core")

export default get_free_slots = (calendars) => {
    const now = parseInt(utils.to_hour(joda.ZonedDateTime.now(joda.ZoneId.of("UTC-03:00")).toString()))
    const start = create_start(now)
    const end = 2359
    const free_slots = []
    calendars.forEach((cal) => {
        const calendar = normalize_calendar(cal)
        const raw_slots = get_raw_slots(start, end, calendar.busy)
        console.log(`raw_slots = ${JSON.stringify(raw_slots)}`)
        const slots = break_raw_slots(raw_slots, 100)
        free_slots.push(slots.map((slot) => {
            return {
                room: calendar.id,
                name: calendar.name,
                start: utils.to_datetime(slot.start),
                end: utils.to_datetime(slot.end)
            }
        }).slice(0, 3))
    })
    return lodash.flatten(free_slots)
}

export function create_start(now) {
    let now_hour = Math.floor(now / 100)
    let now_minute = now % 100
    if (now_minute > 0 && now_minute < 15) {
        now_minute = 15
    } else if (now_minute > 15 && now_minute < 30) {
        now_minute = 30
    } else if (now_minute > 30 && now_minute < 45) {
        now_minute = 45
    } else {
        now_minute = 0
        now_hour++
        if(now_hour > 23) {
            now_hour = 0
        }
    }
    return (now_hour * 100) + now_minute
}

export function normalize_calendar(calendar) {
    return {
        id: calendar.id,
        name: calendar.name,
        busy: normalize_busy_slots(calendar.busy)
    }
}

export function normalize_busy_slots(slots) {
    return slots.map((slot) => {
        return {
            start: parseInt(utils.to_hour(slot.start)),
            end: parseInt(utils.to_hour(slot.end))
        }
    })
}

export function get_raw_slots(start, end, busy) {
    console.log(`start = ${start}, end = ${end}, busy = ${JSON.stringify(busy)}`)
    const free_slots = []
    if (busy.length == 0) {
        free_slots.push({
            start: start,
            end: end
        })
        return free_slots
    }
    sorted_slots = sort_slots(busy)
    let start_offset = Math.min(start, sorted_slots[0].start)
    let end_offset = end
    sorted_slots.forEach(function(slot, _) {
        if (start_offset < slot.start && start_offset >= start) {
            free_slots.push({
                start: start_offset,
                end: Math.min(end, slot.start)
            })
        }
        start_offset = slot.end
        end_offset = slot.end
    })
    if (end_offset < end) {
        free_slots.push({
            start: Math.max(end_offset, start),
            end: end
        })
    }
    return free_slots
}

export function break_raw_slots(raw_slots, max_length) {
    const list = raw_slots.map(function(value) {
        return break_slot(value, max_length)
    })
    return lodash.flatten(list)
}

export function sort_slots(slots) {
    return slots.sort(function(slot1, slot2) {
        return slot1.start - slot2.start
    })
}

export function break_slot(slot, max_length) {
    const list = []
    let start_offset = slot.start
    let end_offset = slot.end
    while (end_offset - start_offset >= max_length) {
        const slot_end = Math.min(slot.end, start_offset + max_length)
        list.push({
            start: start_offset,
            end: slot_end
        })
        start_offset += max_length
    }
    return list
}
