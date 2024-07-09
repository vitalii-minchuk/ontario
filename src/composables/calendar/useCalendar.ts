import { ref, computed } from 'vue'

const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const _weekdayLabels = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
const _monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const _today = new Date()
const _todayComps = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  day: _today.getDate()
}

export function useCalendar() {
  const month = ref(_todayComps.month)
  const year = ref(_todayComps.year)

  const monthIndex = computed(() => month.value - 1)

  const isLeapYear = computed(
    () => (year.value % 4 === 0 && year.value % 100 !== 0) || year.value % 400 === 0
  )

  const previousMonthComps = computed(() => {
    if (month.value === 1) {
      return {
        days: _daysInMonths[11],
        month: 12,
        year: year.value - 1
      }
    }
    return {
      days: month.value === 3 && isLeapYear.value ? 29 : _daysInMonths[month.value - 2],
      month: month.value - 1,
      year: year.value
    }
  })

  const nextMonthComps = computed(() => {
    if (month.value === 12) {
      return {
        days: _daysInMonths[0],
        month: 1,
        year: year.value + 1
      }
    }
    return {
      days: month.value === 2 && isLeapYear.value ? 29 : _daysInMonths[month.value],
      month: month.value + 1,
      year: year.value
    }
  })

  const months = computed(() =>
    _monthLabels.map((ml, i) => ({
      label: ml,
      label_1: ml.substring(0, 1),
      label_2: ml.substring(0, 2),
      label_3: ml.substring(0, 3),
      number: i + 1
    }))
  )

  const weekdays = computed(() =>
    _weekdayLabels.map((wl, i) => ({
      label: wl,
      label_1: wl.substring(0, 1),
      label_2: wl.substring(0, 2),
      label_3: wl.substring(0, 3),
      number: i + 1
    }))
  )

  const header = computed(() => {
    const monthLabel = months.value[monthIndex.value]
    return {
      month: monthLabel,
      year: year.value.toString(),
      shortYear: year.value.toString().substring(2, 4),
      label: monthLabel.label + ' ' + year.value
    }
  })

  const firstWeekdayInMonth = computed(() => new Date(year.value, monthIndex.value, 1).getDay() + 1)

  const daysInMonth = computed(() => {
    if (month.value === 2 && isLeapYear.value) return 29
    return _daysInMonths[monthIndex.value]
  })

  const weeks = computed(() => {
    const weeksArray = []
    let previousMonth = true,
      thisMonth = false,
      nextMonth = false
    let day = previousMonthComps.value.days - firstWeekdayInMonth.value + 2
    let currentMonth = previousMonthComps.value.month
    let currentYear = previousMonthComps.value.year
    for (let w = 1; w <= 6 && !nextMonth; w++) {
      const week = []
      for (let d = 1; d <= 7; d++) {
        if (previousMonth && d >= firstWeekdayInMonth.value) {
          day = 1
          currentMonth = month.value
          currentYear = year.value
          previousMonth = false
          thisMonth = true
        }
        week.push({
          label: day && thisMonth ? day.toString() : '',
          day,
          weekday: d,
          week: w,
          month: currentMonth,
          year: currentYear,
          date: new Date(currentYear, currentMonth - 1, day),
          beforeMonth: previousMonth,
          afterMonth: nextMonth,
          inMonth: thisMonth,
          isToday:
            day === _todayComps.day &&
            currentMonth === _todayComps.month &&
            currentYear === _todayComps.year,
          isFirstDay: thisMonth && day === 1,
          isLastDay: thisMonth && day === daysInMonth.value
        })
        if (thisMonth && day >= daysInMonth.value) {
          thisMonth = false
          nextMonth = true
          day = 1
          currentMonth = nextMonthComps.value.month
          currentYear = nextMonthComps.value.year
        } else {
          day++
        }
      }
      weeksArray.push(week)
    }
    return weeksArray
  })

  const moveThisMonth = () => {
    month.value = _todayComps.month
    year.value = _todayComps.year
  }

  const moveNextMonth = () => {
    const { month: nextMonth, year: nextYear } = nextMonthComps.value
    month.value = nextMonth
    year.value = nextYear
  }

  const movePreviousMonth = () => {
    const { month: prevMonth, year: prevYear } = previousMonthComps.value
    month.value = prevMonth
    year.value = prevYear
  }

  const moveNextYear = () => {
    year.value++
  }

  const movePreviousYear = () => {
    year.value--
  }

  return {
    month,
    year,
    months,
    weekdays,
    header,
    firstWeekdayInMonth,
    daysInMonth,
    weeks,
    moveThisMonth,
    moveNextMonth,
    movePreviousMonth,
    moveNextYear,
    movePreviousYear
  }
}
