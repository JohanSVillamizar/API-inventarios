// controllers/inventoryController.js
const fs = require('fs');
const moment = require('moment');
const Joi = require('@hapi/joi');
const { v4: uuidv4 } = require('uuid');

const validator = require('../validator');
const inventoryFilePath = './inventory.json';


const inventoryController = {

  

  getAllItems: (req, res) => {
    try {
      const inventoryData = fs.readFileSync(inventoryFilePath, 'utf8');
      let inventory = JSON.parse(inventoryData);
  
      const { filterBy, filterValue } = req.query;
  
      
      if (filterBy && filterValue) {//Filtrar los registros
        inventory = inventory.filter(item => item[filterBy] === filterValue);
        
        
        if (inventory.length === 0) {// Mensaje en caso de que el valor buscado no exista
          return res.status(404).send(`No se encontró ningún objeto con ${filterBy}=${filterValue}`);
        }
      }
  
      
      if (!filterBy) { // Si no se especifica ningún filtro, devolver todos los registros
        return res.json(inventory);
      }
  
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
      
      newItem.id = inventory.length + 1;


      newItem.serial_number = uuidv4();
      

      const reorderedNewItem = Object.assign({ id: newItem.id},newItem);

      inventory.push(reorderedNewItem);
  
      fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 2));
      
      res.status(201).json(reorderedNewItem);
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

        inventory[itemIndex] = { ...inventory[itemIndex], ...updatedData };

        fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 2));

        res.json(inventory[itemIndex]);
      } else {

        res.status(404).send('Item no encontrado');
      }
    } catch (err) {

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
  },

  updateFieldInAllItems: (req, res) => {
    try {
      const inventoryData = fs.readFileSync(inventoryFilePath, 'utf8');
      let inventory = JSON.parse(inventoryData);

      const currentDate = moment().format('YYYY-MM-DD HH:mm');

      // Recorrer cada elemento del inventario y actualizar el campo updated_at si está vacío o no existe
      inventory.forEach(item => {
        if (!item.updated_at) {
          item.updated_at = currentDate;
        }
      });

      // Guardar los cambios en el archivo
      fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 2));

      res.json({ message: 'Campo updated_at actualizado en todos los registros.' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = inventoryController;
