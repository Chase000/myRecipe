process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: process.env.PORT || 8000,
    api: {
        prefix: process.env.API_PREFIX || '/api/v1',
    },
    router: {
        prefix: process.env.ROUTER_PREFIX || 'routes/v1'
    },
    
    mongoose: 'mongodb+srv://Chase:123@cluster0.bcyp8.mongodb.net/Spiral?retryWrites=true&w=majority',

};