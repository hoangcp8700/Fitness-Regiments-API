import { addMinutes, format, formatDistanceToNow, getDay } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date: string) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateOriginal(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
}

export function fDateTime(date: string) {
  return format(new Date(date), "dd/MM HH:mm");
}

export function fDateTimeSuffix(date: string) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date: string) {
  const oneDay = 86400000;
  if (new Date().getTime() - Math.floor(new Date(date).getTime()) > oneDay) {
    return fDateTime(date);
  }
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function fGetDay(date: string) {
  const day = getDay(new Date(date));
  if (day === 0) {
    return "Chủ Nhật";
  }
  if (day === 1) {
    return "Thứ Hai";
  }
  if (day === 2) {
    return "Thứ Ba";
  }
  if (day === 3) {
    return "Thứ Tư";
  }
  if (day === 4) {
    return "Thứ Năm";
  }
  if (day === 5) {
    return "Thứ Sáu";
  }
  if (day === 6) {
    return "Thứ Bảy";
  }
  return undefined;
}

export function fTime(date: string) {
  return format(new Date(date), "HH:mm");
}

export default function timezone() {
  const date = new Date();
  return date.setHours(date.getHours() + 7);
}

export function fAddMinute(minute: number) {
  const currentTime = timezone();
  return addMinutes(currentTime, minute);
}

export function isExpiredTime(expirationTime: Date) {
  const currentTime = timezone();
  return currentTime > expirationTime.getTime();
}
