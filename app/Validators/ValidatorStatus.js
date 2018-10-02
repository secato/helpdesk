'use strict'

class ValidatorSetor {
  get rules () {
    return {
      nome: 'required|accepted',
      habilitado: 'required|boolean',
      habilitadoOperador: 'required|boolean'
    }
  }

  get messages () {
    return {
      'nome.required': 'O campo nome é obrigatório',
      'habilitado.required': 'O campo habilitado é obrigatório',
      'habilitadoOperador.required': 'O campo habilitado operador é obrigatório'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorSetor
