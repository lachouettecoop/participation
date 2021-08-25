import { format } from "date-fns"
import fr from "date-fns/locale/fr"

const formatInFrench = (date: Date | number | string, pattern: string) => {
  if (typeof date === "string") {
    date = new Date(date)
  }
  return format(date, pattern, { locale: fr })
}

export const formatDate = (date: Date | number | string) => formatInFrench(date, "EEEE d MMMM")

export const formatTime = (date: Date | number | string) => formatInFrench(date, "HH:mm")

export const queryDate = (date: Date | number) => format(date, "yyyy-MM-dd")
