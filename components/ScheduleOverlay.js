import FilterControl from './FilterControl.js'
import ZoomControl from './ZoomControl.js'

export default {
    components: {
        FilterControl,
        ZoomControl
    },

    template: `
        <div class="schedule-overlay">
            <filter-control></filter-control>
            <zoom-control></zoom-control>
        </div>
    `
}