const joda = require("@js-joda/core")

export function to_hour(datetime) {
    return /T(\d\d:\d\d)/g.exec(datetime)[1].replace(':', '')
}

export function to_datetime(time) {
    const datetime = joda.ZonedDateTime.now(joda.ZoneId.of("UTC-03:00"))
    const hour = Math.floor(time / 100)
    const minute = time % 100
    return datetime
        .withHour(hour)
        .withMinute(minute)
        .withSecond(1)
        .withNano(0)
        .withFixedOffsetZone()
        .toString()
}
