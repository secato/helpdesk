module.exports = {
  apps: [{
    name: 'helpdesk',
    script: './server.js',
    instances: 0,
    exec_mode: 'cluster',
    merge_logs: true
  }]
}
