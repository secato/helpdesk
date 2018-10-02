'use strict'

class ValidatorPredio {
  get rules () {
    return {
      nome: 'required',
      descricao: 'string|min:4'
    }
  }

  get messages () {
    return {
      'nome.required': 'O campo nome é obrigatório',
      'descricao.min': 'O campo descrição deve ter mais de 8 caracteres'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorPredio
