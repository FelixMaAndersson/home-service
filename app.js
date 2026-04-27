import { createApp, ref, computed, onMounted, onUnmounted, useTemplateRef } from 'vue'; // this is exactly like in jasa
import PersonRow from './components/PersonRow.js';
import ScheduleHeader from './components/ScheduleHeader.js';
import ScheduleOverlay from './components/ScheduleOverlay.js';
import TheNavBar from './components/TheNavBar.js';

// The "root component". Defines its setup, uses child components, and renders the main template.
const app = {

    // the components that we use
    components: {
        PersonRow,
        ScheduleHeader,
        ScheduleOverlay,
        TheNavBar
    },

    // in setup() we define the data and functions that this component uses.
    setup() {
        const persons = ref([])
        const selectedProfessions = ref([])

        const today = new Date()

        const viewStartDate = new Date(today)

        // monday this week
        const day = viewStartDate.getDay() || 7
        viewStartDate.setDate(viewStartDate.getDate() - (day - 1))

        // backs two weeks too get all the data
        viewStartDate.setDate(viewStartDate.getDate() - 14)

        const viewStart = viewStartDate.toISOString().split('T')[0]

        const visibleDays = 27 // to not show sundays
        const totalDays = 55
        const nameColumnWidth = 200
        const days = generateDays()

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

        // creates the grid columns: one fixed name column and day columns sized so that 28 days (27) are visible.
        function scheduleStyle() {
            const gap = 5
            const totalGapWidth = (visibleDays - 1) * gap

            return `
        grid-template-columns: ${nameColumnWidth}px repeat(${totalDays}, calc((100vw - ${nameColumnWidth}px - ${totalGapWidth}px) / ${visibleDays}));
    `
        }

        function toggleProfession(profession) {
            if (selectedProfessions.value.includes(profession)) {
                selectedProfessions.value = selectedProfessions.value.filter(p => p !== profession)
            } else {
                selectedProfessions.value.push(profession)
            }
        }

        const filteredPersons = computed(() => {
            if (selectedProfessions.value.length === 0) {
                return persons.value
            }

            return persons.value.filter(person =>
                person.professions.some(profession =>
                    selectedProfessions.value.includes(profession)
                )
            )
        })

        // return the values that the template should have access to.
        return {
            persons,
            filteredPersons,
            selectedProfessions,
            toggleProfession,
            days,
            scheduleStyle,
            viewStart,
        }
    },

    // our index.html html, where every component is added by writing <component-name></component-name>
    template: `
     <the-nav-bar></the-nav-bar>
    <div class="schedule-wrapper">
       
        
        <div class="schedule" :style="scheduleStyle()">
            
            <schedule-header 
            :days="days"
            :view-start="viewStart"
            ></schedule-header>

                <person-row
                    v-for="(p, index) in filteredPersons"
                    :person="p"
                    :top-row="index * 2 + 3"
                    :view-start="viewStart"
                    :days="days"
                ></person-row>
        </div>
        <schedule-overlay
            @toggle-profession="toggleProfession"
        ></schedule-overlay>
    </div>
    `
}

createApp(app).mount('#app')