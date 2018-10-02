'use strict'

const Usuario = use('App/Models/Usuario')
const { validate } = use('Validator')
const Logger = use('Logger')

class LoginController {
  index ({ session, response, view }) {
    if (session.get('user')) { return response.redirect('/chamados') }

    return view.render('login.signin')
  }

  async login ({ request, response, session }) {
    // TODO: validator post form
    const { login, password } = request.post()

    // need to do authentication
    // this was done with Ldap before, but i deleted since it makes no sense here

    try {
      const usuario = await Usuario.findBy('login', login)
      if (usuario) {
        session.put('user', usuario.toJSON())
      } else {
        throw new Error("User doesn't exists")
      }

      const redirect = session.pull('redirect')
      return response.redirect(redirect || '/home')
    } catch (exception) {
      if (exception.hasOwnProperty('error')) {
        session.flashOnly(['login'])
        session.flash({ notification: 'Login or password incorrect', type: 'error' })
      } else {
        session.flash({ notification: 'Error on login, contact administrator', type: 'error' })
        Logger.error('LOGIN - %', exception)
      }
      response.redirect('back')
    }
  }

  async logout ({ session, response }) {
    // clear session store
    session.clear()
    // redirect to login page
    response.redirect('/')
  }
}

module.exports = LoginController
