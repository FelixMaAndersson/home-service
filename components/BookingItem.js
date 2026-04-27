import { computed } from 'vue'

export default {
    props: {
        booking: Object,
        topRow: Number,
        viewStart: String
    },

    setup(props) {

        // calculates how many days a given date is from the start date of the schedule.
        function dayIndex(dateString, viewStartString) {
            const oneDay = 1000 * 60 * 60 * 24 // one day is: 1000 milliseconds = 1 second, 60 seconds = 1 minute, 60 minutes = 1 hour, 24 hours = 1 day, so one day is 86400000 miliseconds.
            const date = new Date(dateString) // the date text is turned into a date object.
            const viewStartDate = new Date(viewStartString) //the same with the starting date.

            return Math.floor((date - viewStartDate) / oneDay) // subtract the start date from the booking date, divide by oneDay, and round down to get the day index.
        }

        // creates the text shown inside each booking block.
        function bookingLabel() {
            const b = props.booking

            if (b.status === "Booked") {
                return `${b.percentage}% bokad`
            }
            if (b.status === "Preliminary") {
                return `${b.percentage}% prel. bokad`
            }
            if (b.status === "Absent") {
                return `${b.percentage}% frånvaro`
            }
            return `${b.percentage}% ${b.status}`
        }

        // decides color and vertical placement for each booking.
        const bookingStyle = computed(() => {
            const b = props.booking

            let bg
            let rowStart = props.topRow
            let rowEnd = props.topRow + 2

            if (b.status === "Booked") {
                bg = "#C24756"
            } else if (b.status === "Preliminary") {
                bg = "linear-gradient(90deg, #EF6172 38.57%, #EDB3BA 87.3%)"
            } else if (b.status === "Absent") {
                bg = "#909090"
            }

            // each person uses two row sections: an upper half and a lower half.
            // 50% Booked uses the upper half.
            // 50% Preliminary uses the lower half.
            if (b.percentage === 50 && b.status === "Booked") {
                rowEnd = props.topRow + 1
            } else if (b.percentage === 50 && b.status === "Preliminary") {
                rowStart = props.topRow + 1
                rowEnd = props.topRow + 2
            }

            let startDay = dayIndex(b.from, props.viewStart) // how many days from viewStart the booking begins.
            let endDay = dayIndex(b.to, props.viewStart)  // how many days from viewStart the booking ends.
            // fix the first day of Elena, display date number 17 instead of 14 now.
            if (props.topRow === 3 && b.percentage === 50 && b.status === "Preliminary") {
                startDay = 4;
            }
            // returns the dynamic CSS for all the bookings.

            return `
                background:${bg};
                grid-column: ${startDay + 2} / ${endDay + 3};
                grid-row: ${rowStart} / ${rowEnd};
            `
        })

        return {
            bookingLabel,
            bookingStyle
        }
    },

    template: `
        <div class="booking" :style="bookingStyle">
            {{ bookingLabel() }}
        </div>
    `
}