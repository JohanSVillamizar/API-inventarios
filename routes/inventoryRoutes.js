    // routes/inventoryRoutes.js
    const express = require('express');
    const router = express.Router();
    const inventoryController = require('../controllers/inventoryController');
    const validateItemSchema = require('../middleware/validateItemSchema'); // Importa el middleware

    router.get('/', inventoryController.getAllItems);
    router.get('/:itemId', inventoryController.getItemById);
    router.post('/', validateItemSchema, inventoryController.addItem);
    router.put('/:itemId',validateItemSchema, inventoryController.updateItem);
    router.delete('/:itemId', inventoryController.deleteItem);

    module.exports = router;
