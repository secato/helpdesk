'use strict'

class ValidatorSetor {
  get rules () {
    return {
      nome: 'required',
      descricao: 'string|min:8',
      centro: 'required'
    }
  }

  get messages () {
    return {
      'nome.required': 'O campo nome é obrigatório',
      'descricao.min': 'O campo descrição deve ter mais de 8 caracteres',
      'centro.required': 'O campo centro é obrigatório'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorSetor
