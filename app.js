// this is exactly like in java
import { createApp, ref, computed, onMounted, onUnmounted, useTemplateRef } from 'vue'
import PersonRow from './components/PersonRow.js'
import ScheduleHeader from './components/ScheduleHeader.js'
import ScheduleOverlay from './components/ScheduleOverlay.js'
import ScheduleToolbar from './components/ScheduleToolbar.js'


// The "root component". Defines its setup, uses child components, and renders the main template.
const app = {

    // the components that we use
    components: {

        PersonRow,
        ScheduleHeader,
        ScheduleOverlay,
        ScheduleToolbar
    },

    // in setup() we define the data and functions that this component uses.
    setup() {
        const persons = ref([]) // creates an empty array that we fill with data from the API.
        const viewStart = "2026-04-09" // this is our first date in the schedule.
        const visibleDays = 28 // how many days that are visible in a view.
        const totalDays = 55 // how many days exist in the full schedule.
        const nameColumnWidth = 180 // the widht of the name column.
        const days = generateDays() // creates a list of days for the first row where we see the dates.

        // we fetch the data from the API, turn the response into JavaScript data, and store it in persons.
        fetch('https://yrgo-web-services.netlify.app/bookings')
            .then(resp => resp.json())
            .then(data => persons.value = data)

         // here we create all the dates.
        function generateDays() {
            const days = [] // an empty array of days.
            const start = new Date(viewStart) //viewStart is turned in to a real date object.

            // loop that creates all dates in the schedule.
            for (let i = 0; i < totalDays; i++) {
                const d = new Date(start)
                d.setDate(start.getDate() + i)
                days.push(d)
            }

            return days
        }

        // creates the grid columns: one fixed name column and day columns sized so that 28 days are visible.
        function scheduleStyle() {
            return `
                grid-template-columns: ${nameColumnWidth}px repeat(${totalDays}, calc((100vw - ${nameColumnWidth}px) / ${visibleDays}));
            `
        }

        // return the values that the template should have access to.
        return {
            persons,
            days,
            scheduleStyle,
            viewStart,
        }
    },

    // our index.html html, where every component is added by writing <component-name></component-name>
    template: `
    <div class="schedule-wrapper">
        <div class="schedule" :style="scheduleStyle()">
            
            <schedule-header :days="days"></schedule-header>

                <person-row
                    v-for="(p, index) in persons"
                    :person="p"
                    :top-row="index * 2 + 3"
                    :view-start="viewStart"
                ></person-row>
        </div>
        <schedule-overlay></schedule-overlay>
    </div>
    `
}

createApp(app).mount('#app')