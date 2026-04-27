import { computed, ref, onMounted, onUnmounted } from 'vue'

export default {
    props: {
        days: Array,
        viewStart: String
    },

    setup(props) {

        // to show the letter of each day in the header
        function dayLetter(date) {
            const day = date.getDay()
            if (day === 0 || day === 6) return ''
            const letters = ['S', 'M', 'T', 'O', 'T', 'F', 'L']
            return letters[day]
        }

        // A function that groups "days" into weeks.

        function getWeekNumber(date) {
            const d = new Date(date)
            d.setHours(0, 0, 0, 0)
            d.setDate(d.getDate() + 4 - (d.getDay() || 7))
            const yearStart = new Date(d.getFullYear(), 0, 1)
            return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
        }
        const weeks = computed(() => {
            const result = []
            let current = null

            props.days.forEach((d, i) => {
                const isSunday = d.getDay() === 0

                if (!current || isSunday) {
                    current = {
                        week: getWeekNumber(d),
                        start: i,
                        end: i
                    }
                    result.push(current)
                } else {
                    current.end = i
                }
            })

            return result
        })

        // the clock
        const currentTime = ref(new Date())
        let interval

        onMounted(() => {
            interval = setInterval(() => {
                currentTime.value = new Date()
            }, 1000)
        })

        onUnmounted(() => clearInterval(interval))

        // A label for the current month in view.

        const viewMonth = computed(() => {
            return props.days[0]?.toLocaleString('sv-SE', { month: 'long' })
        })
        const currentDateLabel = computed(() => {
            return currentTime.value.toLocaleDateString('sv-SE', {
                weekday: 'long',
                day: 'numeric'
            })
        })

        function isToday(date) {
            const now = new Date()
            return date.toDateString() === now.toDateString()
        }

        return {
            weeks,
            dayLetter,
            currentTime,
            viewMonth,
            isToday,
            currentDateLabel
        }

    },

    template: `
    <div class="header-bg"></div>
    <!-- LEFT HEADER -->
<div class="date-header">
    <div class="month-label-top">
        <div class="month-label-top">◀ {{ viewMonth }} ▶</div>
    </div>

    <div class="date-label">{{ currentDateLabel }}</div>
    <div class="clock">{{ currentTime.toLocaleTimeString() }}</div>
</div>

    <!-- WEEK ROW -->
    <template v-for="(w, index) in weeks" :key="'week-' + index">
        <div
            class="week-cell"
            :class="{ 'week-divider': index !== 0 }"
            :style="{
                gridColumn: (w.start + 2) + ' / ' + (w.end + 3),
                gridRow: 1
            }"
        >
            Vecka {{ w.week }}
        </div>
    </template>

    <!-- DAY ROW -->
    <template v-for="(d, i) in days" :key="'day-' + i">
        <div
            class="date-cell"
            :class="{
                today: isToday(d),
                weekend: d.getDay() === 0 || d.getDay() === 6,
                'week-divider': d.getDay() === 0
            }"
            :style="{
                gridColumn: i + 2,
                gridRow: 2
            }"
        >
            <!-- DATE NUMBER -->
            <div class="date-number">
                {{ (d.getDay() === 0 || d.getDay() === 6) ? '' : d.getDate() }}
            </div>

            <!-- DAY LETTER -->
            <div class="date-letter">
                {{ dayLetter(d) }}
            </div>
        </div>
    </template>

    <!-- MARKER -->
    <template v-for="(d, i) in days" :key="'today-marker-' + i">
        <div
            v-if="isToday(d)"
            class="today-arrow"
            :style="{
                gridColumn: i + 2,
                gridRow: 2
            }"
        ></div>

        <div
            v-if="isToday(d)"
            class="today-line"
            :style="{
                gridColumn: i + 2,
                gridRow: '3 / 59'
            }"
        ></div>
    </template>
`
}