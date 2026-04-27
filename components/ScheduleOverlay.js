import FilterControl from './FilterControl.js'
import ZoomControl from './ZoomControl.js'

export default {
    components: {
        FilterControl,
        ZoomControl
    },

    emits: ['toggle-profession'],

    template: `
        <div class="schedule-overlay">
            <filter-control
                @toggle-profession="$emit('toggle-profession', $event)"
            ></filter-control>

            <zoom-control></zoom-control>
        </div>
    `
}