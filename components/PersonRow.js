import BookingItem from './BookingItem.js'

export default {
    components: {
        BookingItem
    },

    props: {
        person: Object,
        topRow: Number,
        viewStart: String,
        days: Array
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

        function rowBackgroundStyle(topRow) {
    return `
        grid-column: 2 / -1;
        grid-row: ${topRow} / ${topRow + 2};
    `
}

        return {
            jobImage,
            nameStyle,
            rowBackgroundStyle
        }
    },

    // as you see here BookingItem is a child of PersonRow
    template: `

    <div
    class="person-row-bg"
    :class="{ even: topRow % 4 === 3 }"
    :style="rowBackgroundStyle(topRow)"
></div>

        <template v-for="(d, i) in days" :key="'person-divider-' + i">
            <div
                v-if="d.getDay() === 0"
                class="week-divider person-week-divider"
                :style="{
                    gridColumn: i + 2,
                    gridRow: topRow + ' / ' + (topRow + 2)
                }"
            ></div>
        </template>
        
        <div
            class="name"
            :style="nameStyle(topRow)"
        >
            <div class="job-icons">
            <img
                v-for="profession in person.professions"
                :src="jobImage(profession)"
                class="job-icon"
                :alt="profession"
            >
            </div>
            <div class="person-name">
                {{ person.name }}
            </div>
        </div>

        <booking-item
            v-for="b in person.bookings"
            :booking="b"
            :top-row="topRow"
            :view-start="viewStart"
        ></booking-item>
    `
}