export default {
    name: 'TheNavbar',
    data() {
        return {
            menuItems: [
                { id: 'oversikt', name: 'ÖVERSIKT' },
                { id: 'bokning', name: 'BOKNING' },
                { id: 'schemalaggning', name: 'SCHEMALÄGGNING' },
                { id: 'projektinfo', name: 'PROJEKTINFORMATION' }
            ],
            activeTab: 'schemalaggning'
        }
    },
    template: `
        <nav class="main-navbar">
            <div class="nav-left">
                <div class="logo-placeholder">
                    <img src="assets/logo.png" class="icon" >
                </div>
            </div>

            <ul class="nav-menu">
                <li v-for="item in menuItems" 
                    :key="item.id"
                    :class="{ active: activeTab === item.id }"
                    @click="activeTab = item.id">
                    {{ item.name }}
                </li>
            </ul>

            <div class="nav-right">
                <a href="#" class="logout-link">LOGGA UT</a>
            </div>
        </nav>
    `
};