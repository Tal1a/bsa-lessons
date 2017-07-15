const router = require('express').Router();
const service = require('../../services/user');
const messageService = require('../../services/message');

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

router.get("/:id/interlocutors", (request, response, next) => {
    let messages = messageService.findBySenderIdId(Number(request.params.id));
    let receiverIds = Array.from(new Set(messages.map(message => message.receiverId)));
    response.json(receiverIds.map(receiverId => service.findById(receiverId)));
});

router.post("/", (request, response, next) => {
    try {
        var user = service.newUser(request.body);
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
