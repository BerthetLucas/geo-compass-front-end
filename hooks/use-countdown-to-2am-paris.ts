import { useEffect, useState } from "react"
import { toZonedTime, fromZonedTime } from "date-fns-tz"
import {
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
} from "date-fns"

const PARIS_TZ = "Europe/Paris"

function getNext2AMParis(): Date {
  const now = new Date()
  const parisNow = toZonedTime(now, PARIS_TZ)
  let target = setMilliseconds(
    setSeconds(setMinutes(setHours(parisNow, 2), 0), 0),
    0
  )
  if (!isBefore(parisNow, target)) target = addDays(target, 1)
  return fromZonedTime(target, PARIS_TZ)
}

export function useCountdownTo2AMParis() {
  const [countdown, setCountdown] = useState("")

  useEffect(() => {
    function compute() {
      const diff = getNext2AMParis().getTime() - Date.now()
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1_000)
      setCountdown(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      )
    }
    compute()
    const id = setInterval(compute, 1000)
    return () => clearInterval(id)
  }, [])

  return countdown
}
