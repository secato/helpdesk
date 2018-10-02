'use strict'

class ValidatorProblema {
  get rules () {
    return {
      nome: 'required',
      dica: 'string|min:8',
      area_id: 'required',
      sla: 'required',
      prioridade: 'required|in:Normal,High,Urgent'
    }
  }

  get messages () {
    return {
      'nome.required': 'O campo nome é obrigatório',
      'dica.min': 'O campo dica deve ter mais de 8 caracteres',
      'area_id.required': 'O campo área é obrigatório',
      'sla.required': 'O campo sla é obrigatório',
      'prioridade.required': 'O campo prioridade é obrigatório'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorProblema
