# User

## GET /api/user/:id
Returns a user with the given id.
* 200 with the user in response when it is succeeded
* 400 when the user is not found

## GET /api/user/:id/interlocutors
Returns all interlocutors for a user with the given id.
* 200 with all interlocutors in response when it is succeeded
* 400 when the user is not found

## POST /api/user
Creates a user with properties provided in the body.
* 200 with the new user in response when it is succeeded

## PUT /api/user/:id
Updates a user with the given id by setting his properties with ones provided in the body.
* 200 with the updated user in response when it is succeeded
* 400 when the user is not found

## DELETE /api/user/:id
Deletes a user with the given id.
* 200 when the user is deleted
* 400 when the user is not found

# Message

## GET /api/message/:id
Returns a message with the given id.
* 200 with the message in response when it is succeeded
* 400 when the message is not found

## POST /api/message
Creates (sends) a message with properties provided in the body.
* 200 with the new message in response when it is succeeded

## PUT /api/message/:id
Updates a message with the given id by setting his properties with ones provided in the body.
* 200 with the updated message in response when it is succeeded
* 400 when the message is not found

## DELETE /api/message/:id
Deletes a user with the given id.
* 200 when the message is deleted
* 400 when the message is not found
