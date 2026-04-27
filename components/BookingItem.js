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

        const bookingStyle = computed(() => {
            const b = props.booking

            let rowStart = props.topRow
            let rowEnd = props.topRow + 2

            if (b.percentage === 50 && b.status === "Booked") {
                rowEnd = props.topRow + 1
            } else if (b.percentage === 50 && b.status === "Preliminary") {
                rowStart = props.topRow + 1
                rowEnd = props.topRow + 2
            }

            const startDay = dayIndex(b.from, props.viewStart)
            const endDay = dayIndex(b.to, props.viewStart)

            return `
        grid-column: ${startDay + 2} / ${endDay + 3};
        grid-row: ${rowStart} / ${rowEnd};
    `
        })

        const bookingInnerStyle = computed(() => {
            const b = props.booking

            if (b.status === "Booked") {
                return `background: #C24756;`
            }

            if (b.status === "Preliminary") {
                return `background: linear-gradient(90deg, #EF6172 38.57%, #EDB3BA 87.3%);`
            }

            if (b.status === "Absent") {
                return `background: #909090;`
            }
        })
       

    return {
        bookingLabel,
        bookingStyle,
        bookingInnerStyle
    }
},

template: `
    <div class="booking-wrapper" :style="bookingStyle">
        <div class="booking" :style="bookingInnerStyle">
            {{ bookingLabel() }}
        </div>
    </div>    
    `
}