const {getItems, getItem, addItem,deleteItem} = require('../controllers/items');
const ItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  }
};

const getItemsOpt = {
  schema: {
    description: 'Get all items',
    response: {
      200: {
        type: 'array',
        items: ItemSchema
      }
    }
  },
  handler: getItems
};

const getItemOpt = {
  schema: {
    description: 'Get Single item',
    response: {
      200: ItemSchema
    }
  },
  handler: getItem

};

const addItemOpt = {
  schema: {
    description: 'Add a new item',
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string', default: 'No description provided' }
      }
    },
    response: {
      201: ItemSchema
    }
  },
  handler: addItem
};

const deleteItemOpt = {
  schema: {
    description: 'delete an item by ID',
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  handler: deleteItem

};
function itemsRoutes(fastify, options, done) {

  // Route to get all items
  fastify.get('/items', getItemsOpt);

  // Route to get a single item by ID
  fastify.get('/item/:id', getItemOpt);

  // Route to add a new item
  fastify.post('/item', addItemOpt);

  // Route to delete an item by ID
  fastify.delete('/item/:id', deleteItemOpt);

  done();
}

module.exports = itemsRoutes;