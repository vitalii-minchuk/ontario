export interface CalendarCompositionModel {
  currentDateAsYearMonth: string
  // getEmployeesWithoutTeam: () => DepartmentMemberFullModel[]
}

export function useCalendar(): CalendarCompositionModel {
  const currentDate = new Date()
  const currentDateAsYearMonth = [
    currentDate.getFullYear(),
    ('0' + (currentDate.getMonth() + 1)).slice(-2)
  ].join('/') // 1999/11

  return {
    currentDateAsYearMonth
  }
}
