

export default {
    props: {
        days: Array
    },

    setup() {

        function dayLetter(date) {
            const letters = ['S', 'M', 'T', 'O', 'T', 'F', 'L']
            return letters[date.getDay()]
        }

        // TODO: Create a function that groups "days" into weeks.
        // Each week should know which day index it starts and ends at,
        // so it can span across multiple grid columns.


        // TODO: Add a reactive clock (current time).
        // This should update every second and be shown in the top-left cell.


        // TODO: Add a label for the current month in view.
        // For now, this can be based on viewStart (simple version),
        // but later it could depend on scroll position.

        return {
            // weeks,
            // currentDate,
            // currentTime,
            // viewMonth,
               dayLetter
        }

    },

    template: `
        <div class="date-header"></div>

        <div
            v-for="(d, i) in days"
            class="date-cell"
            :style="'grid-column: ' + (i + 2) + '; grid-row: 2'"
        >
            <div class="date-number">{{ d.getDate() }}</div>
            <div class="date-letter">{{ dayLetter(d) }}</div>
        </div>
    `
}