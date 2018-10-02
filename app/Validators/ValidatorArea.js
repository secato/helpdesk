'use strict'

class ValidatorArea {
  get rules () {
    return {
      nome: 'required'
    }
  }

  get messages () {
    return {
      'nome.required': 'O campo nome é obrigatório'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorArea
