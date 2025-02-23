// persona.service.js
const PersonaRepository = require('../repositories/persona.repository');
const Validaciones = require('../utils/validation');
const Utils = require('../utils/utils');

class PersonaService {
  async getAllPersonas() {
    return await PersonaRepository.getAllPersonas();
  }

  async getPersonaById(id) {
    const persona = await PersonaRepository.getPersonaById(id);
    if (!persona) {
      throw new Error('Persona no encontrada');
    }
    return persona;
  }

  async createPersona(persona) {
    if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
      throw new Error('Todos los campos son requeridos');
    }
    Validaciones.validarRFC(persona.rfc);
    Validaciones.validarCorreo(persona.correo);

    const personaByRFC = await PersonaRepository.getPersonaByRFC(persona.rfc);
    const personaByCorreo = await PersonaRepository.getPersonaByCorreo(persona.correo);

    if (personaByRFC) {
      throw new Error('El RFC ya existe');
    }
    if (personaByCorreo) {
      throw new Error('El Correo ya existe');
    }

    if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
      throw new Error('La persona debe ser mayor de edad');
    }

    return await PersonaRepository.createPersona(persona);
  }

  async updatePersona(id, persona) {
    const personaExistente = await PersonaRepository.getPersonaById(id);
    if (!personaExistente) {
      throw new Error('Persona no encontrada');
    }
    return await PersonaRepository.updatePersona(id, persona);
  }

  // Método para eliminar una persona
  async deletePersona(id) {
    const persona = await PersonaRepository.getPersonaById(id);
    if (!persona) {
      throw new Error('Persona no encontrada');
    }
    return await PersonaRepository.deletePersona(id);
  }
}

module.exports = new PersonaService();
