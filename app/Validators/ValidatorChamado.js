'use strict'

class ValidatorChamado {
  get rules () {
    return {
      descricao: 'required',
      patrimonio: 'min:6|max:6',
      ramal: 'required|min:4|max:4',
      status_id: 'required',
      problema_id: 'required',
      predio_id: 'required',
      local: 'required'
    }
  }

  get messages () {
    return {
      'descricao.required': 'O campo descrição é obrigatório',
      'ramal.required': 'O campo ramal é obrigatório',
      'status_id.required': 'O campo status é obrigatório',
      'problema_id.required': 'O campo problema é obrigatório',
      'predio_id.required': 'O campo prédio é obrigatório',
      'local.required': 'O campo local é obrigatório'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorChamado
