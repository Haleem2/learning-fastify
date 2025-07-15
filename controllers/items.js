let items = require('../Items');

const getItems = (req, reply) => {
    reply.send(items);
};

const getItem = (req, reply) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) {
        return reply.status(404).send({ error: 'Item not found' });
    }
    return reply.send(item);
}

const addItem = (req, reply) => {
    const newItem = {
        id: items.length + 1, // Simple ID generation
        name: req.body.name,
        description: req.body.description || 'No description provided'
    };
    items.push(newItem);
    reply.status(201).send(newItem);
}

const deleteItem = (req, reply) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) {
        return reply.status(404).send({ error: 'Item not found' });
    }
    items.splice(index, 1);
    reply.send({ message: `Item ${id} deleted successfully` });
};

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem
};