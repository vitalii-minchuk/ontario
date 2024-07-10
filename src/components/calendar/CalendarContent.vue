<script setup lang="ts">
const eventsStore = useEventsStore()
const {
  weekdays,
  header,
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
            :style="
              eventsStore.getEventStyleByCategory(
                event.category as 'holiday' | 'studying' | 'conference'
              )
            "
            class="event"
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
  color: #333;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  background-color: #f5f5f5;
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
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #666;
  border-width: 1px;
  border-style: solid;
  border-color: #ddd;
  background-color: #e5e5e5;
  cursor: default;
}

.week {
  display: flex;
}

.day-cell {
  width: 700px;
  min-height: 100px;
  color: #333;
  background-color: #fff;
  border: 1px solid #ddd;
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

.event {
  padding: 4px 8px;
  margin-bottom: 2px;
}

.today {
  font-weight: 500;
  color: #fff;
  background-color: #2196f3;
}

.not-in-month {
  color: #bbb;
  background-color: #f5f5f5;
}

.options {
  padding: 20px;
}

.options .option {
  margin-top: 5px;
}
</style>
