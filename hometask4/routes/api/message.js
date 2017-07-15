const router = require('express').Router();
const service = require('../../services/message');

router.get('/:id', (request, response, next) => {
    try {
        response.data = service.findById(Number(request.params.id));
        response.json(response.data);
    }
    catch (error) {
        response.status(400);
        response.end();
    }
});

router.post("/", (request, response, next) => {
    try {
        var user = service.newMessage(request.body);
        service.add(user);
        response.data = user;
        response.json(response.data);
    } catch (error) {
        response.status(400);
        response.end();
    }
});

router.put('/:id', (request, response, next) => {
    try {
        response.data = service.updateById(Number(request.params.id), request.body);
        response.json(response.data);
    } catch (error) {
        response.status(400);
    }
    response.end();
});


router.delete('/:id', (request, response, next) => {
    try {
        service.deleteById(Number(request.params.id));
        response.status(200);
    } catch (error) {
        response.status(400);
    }
    response.end();
});

module.exports = router;
