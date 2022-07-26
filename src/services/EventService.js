// https://github.com/Code-Pop/real-world-testing/tree/Real-World-Testing-L5-end/src/services

const headers = new Headers()
headers.append( 'Content-Type', 'application/json' )

const baseUrl = 'http://localhost:3000'

export default {
    getEvents() {
        return fetch( baseUrl + '/events', {headers} ).then( res => res.json() )
    },
    getEvent(id) {
        return fetch( baseUrl + '/events/' + id, {headers}).then( res => res.json() )
    },
    postEvent(event) {
        // return apiClient.post('/events', event)
        return null
    }
}
