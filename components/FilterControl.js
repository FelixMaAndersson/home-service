export default {
    emits: ['toggle-profession'],

    // the component that enables the posibility to toggle professions
    setup(props, { emit }) {
        const professions = ['Carpenter', 'Electrician', 'Mason', 'Painter', 'Plumber']

        function toggleProfession(profession) {
            emit('toggle-profession', profession)
        }

        return {
            professions,
            toggleProfession
        }
    },

    template: `
        <div class="filter-controls">
            <img
                v-for="profession in professions"
                :key="profession"
                :src="'assets/' + profession + '.png'"
                @click="toggleProfession(profession)"
            >
        </div>
    `
}