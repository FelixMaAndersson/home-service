import BookingItem from './BookingItem.js'

export default {
    components: {
        BookingItem
    },

    props: {
        person: Object,
        topRow: Number,
        viewStart: String
    },

    setup() {

        // we match the images in assets with the data från the API
        function jobImage(profession) {
            return `assets/${profession}.png`
        }

        // the dynamic CSS
        function nameStyle(topRow) {
            return `
                grid-column: 1;
                grid-row: ${topRow} / ${topRow + 2};
            `
        }

        return {
            jobImage,
            nameStyle
        }
    },

    // as you see here BookingItem is a child of PersonRow
    template: `
        <div
            class="name"
            :style="nameStyle(topRow)"
        >
            {{ person.name }}

            <img
                v-for="profession in person.professions"
                :src="jobImage(profession)"
                class="job-icon"
                :alt="profession"
            >
        </div>

        <booking-item
            v-for="b in person.bookings"
            :booking="b"
            :top-row="topRow"
            :view-start="viewStart"
        ></booking-item>
    `
}