    // routes/inventoryRoutes.js
    const express = require('express');
    const router = express.Router();
    const inventoryController = require('../controllers/inventoryController');
    const validateItemSchema = require('../middleware/validateItemSchema');
    const addCreatedAt = require('../middleware/addCreatedAt');

    router.get('/', inventoryController.getAllItems);
    router.get('/:itemId', inventoryController.getItemById);
    router.post('/',addCreatedAt ,validateItemSchema , inventoryController.addItem);
    router.put('/:itemId',addCreatedAt ,validateItemSchema , inventoryController.updateItem);
    router.delete('/:itemId', inventoryController.deleteItem);
    router.put('/', inventoryController.updateFieldInAllItems);

    module.exports = router;
