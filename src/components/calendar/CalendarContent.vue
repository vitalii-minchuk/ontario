<script setup lang="ts">
const eventsStore = useEventsStore()

const {
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
} = useCalendar()
</script>

<template>
  <div class="calendar">
    <div class="header">
      <a class="arrow" @click="movePreviousYear">&laquo;</a>
      <a class="arrow" @click="movePreviousMonth">&lsaquo;</a>
      <span class="title" @click="moveThisMonth">
        {{ header.label }}
      </span>
      <a class="arrow" @click="moveNextMonth">&rsaquo;</a>
      <a class="arrow" @click="moveNextYear">&raquo;</a>
    </div>
    <div class="weekdays">
      <div class="weekday" v-for="weekday in weekdays" :key="String(weekday)">
        {{ weekday.label_3 }}
      </div>
    </div>
    <div class="week" v-for="week in weeks" :key="String(week)">
      <div
        :key="String(day.date)"
        class="day-cell"
        :class="{ today: day.isToday, 'not-in-month': !day.inMonth }"
        v-for="day in week"
      >
        <p class="day">
          {{ day.day }}
        </p>
        <div class="events-box">
          {{ eventsStore.getDayEventsByDate(`${day.year}-${day.month}-${day.day}`) }}
          <p
            v-for="event in eventsStore.getDayEventsByDate(
              `${day.year}-${day.month < 10 ? 0 : ''}${day.month}-${day.day < 10 ? 0 : ''}${day.day}`
            )"
            :key="event.id"
          >
            {{ event.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: stretch;
  align-items: center;
  color: #333; /* Replace with your header color */
  padding: 10px; /* Replace with your header padding */
  border-width: 1px; /* Replace with your header border width */
  border-style: solid; /* Replace with your header border style */
  border-color: #ccc; /* Replace with your header border color */
  background-color: #f5f5f5; /* Replace with your header background */
}

.header .pointer {
  cursor: pointer;
}

.header .pointer:hover {
  color: #dcdcdc;
}

.header .arrow {
  cursor: pointer;
  padding: 0 0.4em 0.2em 0.4em;
  font-size: 1.8rem;
  font-weight: 500;
  user-select: none;
  flex-grow: 0;
}

.header .title {
  cursor: pointer;
  flex-grow: 1;
  font-size: 1.2rem;
  text-align: center;
}

.weekdays {
  display: flex;
}

.weekday {
  width: 700px; /* Replace with your day width */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px; /* Replace with your weekday padding */
  color: #666; /* Replace with your weekday color */
  border-width: 1px; /* Replace with your weekday border width */
  border-style: solid; /* Replace with your weekday border style */
  border-color: #ddd; /* Replace with your weekday border color */
  background-color: #e5e5e5; /* Replace with your weekday background */
  cursor: default;
}

.week {
  display: flex;
}

.day-cell {
  width: 700px; /* Replace with your day width */
  min-height: 100px; /* Replace with your day height */
  color: #333; /* Replace with your day color */
  background-color: #fff; /* Replace with your day background color */
  border: 1px solid #ddd; /* Replace with your day border */
  cursor: default;
  display: flex;
  justify-content: space-between;
  gap: 4px;
}

.day {
  padding: 4px;
}

.events-box {
  padding: 4px;
  flex-basis: 100%;
}

.today {
  font-weight: 500;
  color: #fff; /* Replace with your today color */
  background-color: #2196f3;
}

.not-in-month {
  color: #bbb; /* Replace with your not-in-month color */
  background-color: #f5f5f5; /* Replace with your not-in-month background color */
}

.options {
  padding: 20px;
}

.options .option {
  margin-top: 5px;
}
</style>
