import os

from flask import Flask, render_template, redirect, url_for, g
from haproxyadmin import haproxy, server

app = Flask(__name__)
config = os.environ.get('HAPLO_CONFIG', 'config.DevelopmentConfig')
app.config.from_object(config)
hap = haproxy.HAProxy(uris=app.config['HAPROXY_URIS'],
                      socket_dir=app.config['HAPROXY_SOCKET_DIR'],
                      socket_file=app.config['HAPROXY_SOCKET_FILE'])


@app.route('/')
def index():
    refresh_servers()
    return render_template('index.html.j2', title=app.config['PAGE_TITLE'])


@app.route('/disable_server/<backend>/<s_name>')
def disable_server(backend=None, s_name=None):
    b = hap.backend(backend)
    s = b.server(s_name)
    s.setstate(server.STATE_DISABLE)

    return redirect(url_for('index'))


@app.route('/enable_server/<backend>/<s_name>')
def enable_server(backend=None, s_name=None):
    b = hap.backend(backend)
    s = b.server(s_name)
    s.setstate(server.STATE_ENABLE)

    return redirect(url_for('index'))


def refresh_servers():
    backends = []

    for backend in hap.backends():

        b_d = {'name': backend.name,
               'status': backend.status,
               'scur': backend.metric('scur'),
               'smax': backend.metric('smax'),
               'slim': backend.metric('slim'),
               'servers': []}

        servers = backend.servers()
        for server in servers:
            s = {'name': server.name,
                 'status': server.status,
                 'scur': server.metric('scur'),
                 'smax': server.metric('smax'),
                 }

            if 'UP' in s['status']:
                s['status'] = 'UP'

            b_d['servers'].append(s)

        backends.append(b_d)

    g.backends = backends

    return True


if __name__ == '__main__':
    app.run()
