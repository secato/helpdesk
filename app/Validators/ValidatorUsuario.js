'use strict'

class ValidatorUsuario {
  get rules () {
    return {
      nome: 'required|accepted',
      login: 'required|accepted|includes:.',
      email: 'required|email',
      funcao: 'required|in:A,O,M'
    }
  }

  get messages () {
    return {
      'nome.required': 'O campo nome é obrigatório',
      'login.required': 'O campo login é obrigatório',
      'login.includes': 'O usuário deve seguir o padrão nome.sobrenome',
      'email.required': 'O campo email é obrigatório',
      'funcao.required': 'O campo função é obrigatório'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorUsuario
