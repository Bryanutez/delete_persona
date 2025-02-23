// persona.controller.js
const PersonaService = require('../services/persona.service');

class PersonaController {
  async getAllPersonas(req, res) {
    try {
      const personas = await PersonaService.getAllPersonas();
      res.status(200).json(personas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPersonaById(req, res) {
    try {
      const personaId = req.params.id;
      if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
        throw new Error('El id de la persona es requerido');
      }
      const persona = await PersonaService.getPersonaById(personaId);
      res.json(persona);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createPersona(req, res) {
    try {
      const persona = await PersonaService.createPersona(req.body);
      res.json(persona);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePersona(req, res) {
    try {
      const personaId = req.params.id;
      if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
        throw new Error('El id de la persona es requerido');
      }
      const persona = await PersonaService.updatePersona(personaId, req.body);
      res.json(persona);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Método para eliminar persona
  async deletePersona(req, res) {
    try {
      const personaId = req.params.id;
      if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
        throw new Error('El id de la persona es requerido');
      }

      await PersonaService.deletePersona(personaId);  // Llamamos al servicio de eliminación
      res.status(200).json({ message: 'Persona eliminada correctamente' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new PersonaController();
