// controllers/inventoryController.js
const fs = require('fs');
const Joi = require('@hapi/joi');
const { v4: uuidv4 } = require('uuid');

const validator = require('../validator');
const inventoryFilePath = './inventory.json';


const inventoryController = {

  

  getAllItems: (req, res) => {
    try {
      const inventoryData = fs.readFileSync(inventoryFilePath, 'utf8');
      const inventory = JSON.parse(inventoryData);
      res.json(inventory);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  getItemById: (req, res) => {
    try {
      const { itemId } = req.params;
      const inventoryData = fs.readFileSync(inventoryFilePath, 'utf8');
      const inventory = JSON.parse(inventoryData);
      const item = inventory.find(item => item.id === parseInt(itemId));
      if (item) {
        res.json(item);
      } else {
        res.status(404).send('Item no encontrado');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  addItem: (req, res) => {
    try {
      const newItem = req.body;
      const inventoryData = fs.readFileSync(inventoryFilePath, 'utf8');
      let inventory = JSON.parse(inventoryData);
      
      newItem.id = inventory.length + 1; // Generar un nuevo ID numérico e incremental

      // Generar un nuevo serial_number utilizando uuid
      newItem.serial_number = uuidv4();
      
      // Reordenar el objeto para que el ID esté primero
      const reorderedNewItem = Object.assign({ id: newItem.id},newItem);

      inventory.push(reorderedNewItem); // Agregar el nuevo elemento ordenado al inventario
  
      fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 2)); // Escribir en el archivo
      
      res.status(201).json(reorderedNewItem); // Enviar la respuesta con el nuevo elemento ordenado
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
    
  

  updateItem: (req, res) => {
    try {
      const { itemId } = req.params;
      const updatedData = req.body;
      const inventoryData = fs.readFileSync(inventoryFilePath, 'utf8');
      let inventory = JSON.parse(inventoryData);
      const itemIndex = inventory.findIndex(item => item.id === parseInt(itemId));
      if (itemIndex !== -1) {
        // Actualizar los datos del elemento encontrado con los datos actualizados
        inventory[itemIndex] = { ...inventory[itemIndex], ...updatedData };
        // Escribir los datos actualizados en el archivo
        fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 2));
        // Responder con el elemento actualizado
        res.json(inventory[itemIndex]);
      } else {
        // Si el elemento no se encuentra, responder con un código de estado 404
        res.status(404).send('Item no encontrado');
      }
    } catch (err) {
      // Manejar errores internos del servidor
      console.error(err);
      res.status(500).send('Server Error');
    }
  },  

  deleteItem: (req, res) => {
    try {
      const { itemId } = req.params;
      const inventoryData = fs.readFileSync(inventoryFilePath, 'utf8');
      let inventory = JSON.parse(inventoryData);
      const updatedInventory = inventory.filter(item => item.id !== parseInt(itemId));
      if (inventory.length !== updatedInventory.length) {
        fs.writeFileSync(inventoryFilePath, JSON.stringify(updatedInventory, null, 2));
        res.send('Item eliminado correctamente');
      } else {
        res.status(404).send('Item no encontrado');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = inventoryController;
