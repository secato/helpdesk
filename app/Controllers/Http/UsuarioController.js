'use strict'

const Usuario = use('App/Models/Usuario')

class UsuarioController {
  async index ({ request, view }) {
    if (request.ajax()) {
      return await Usuario.all()
    } else {
      return view.render('usuario.index')
    }
  }

  async create ({ request, view }) {
    return view.render('usuario.create')
  }

  async store ({ request, response, session }) {
    const usuarioData = request.except('_csrf')
    usuarioData.receberEmail = true
    await Usuario.create(usuarioData)
    session.flash({ notification: 'User created with success', type: 'success' })
    response.redirect('/usuarios')
  }

  async edit ({ response, view, params }) {
    const usuario = await Usuario.find(params.id)
    return view.render('usuario.create', { usuario })
  }

  async update ({ request, response, session, params }) {
    const usuario = await Usuario.find(params.id)

    if (usuario) {
      usuario.nome = request.input('nome')
      usuario.login = request.input('login')
      usuario.email = request.input('email')
      usuario.funcao = request.input('funcao')

      await usuario.save()
      session.flash({ notification: 'User updated with success', type: 'success' })
      return response.redirect('/usuarios')
    }

    session.flash({ notification: 'User not found', type: 'error' })
    return response.redirect('/usuarios')
  }

  async destroy ({ request, response, params }) {
    if ([1, 2, 3].includes(parseInt(params.id))) {
      return response.status(409).send('Cannot delete the default users!')
    }
    const usuario = await Usuario.find(params.id)
    if (usuario) {
      try {
        await usuario.delete()
        return response.send('User deleted with success!')
      } catch (error) {
        return response.usuario(409).send('Cannot delete this user because it is already in use')
      }
    }
    return response.usuario(404).send('Cannot find the user to be deleted!')
  }
}

module.exports = UsuarioController
