export default {

    title: 'Facturador',
    env: "development",
    cookieExpires: 1,

    useI18n: true,
    socketUrl: 'http://10.0.0.194:8081',
    baseUrl: {
        dev: 'http://10.0.0.194:8081/api/v1/',
        pro: 'http://produce.com'
    },

    homeName: 'home',
}
 