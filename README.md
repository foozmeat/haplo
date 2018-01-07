## Install

#### Requires python 3 (tested with python 3.6)

Haplo is a flask app and can be run with `python` or proxied behind something 
like nginx/passenger.

* clone it
* make a virtual environment `python3 -m venv .haplo-venv`
* activate `source .haplo-venv/bin/activate`
* `pip install -r requirements.txt`
* `cp config.py.sample config.py` and fill in the blanks
* python app.py


## Example nginx/passenger configuration

```
server {
    listen 80;
    server_name haplo.party;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ;
    server_name haplo.party;
    
    # SSL
    
    ssl on;
    ssl_certificate     /etc/certificates/haplo.crt;
    ssl_certificate_key /etc/certificates/haplo.key;
    
    client_max_body_size 1G;
    
    access_log /var/www/haplo/logs/access.log;
    error_log /var/www/haplo/logs/error.log;
    
    location = /favicon.ico { log_not_found off; access_log off; }
    location = /robots.txt  { log_not_found off; access_log off; }
    
    passenger_enabled on;
    passenger_app_env production;
    passenger_python /var/www/haplo/.haplo-venv/bin/python3;
    passenger_env_var HAPLO_CONFIG config.ProductionConfig;
    
    root /var/www/haplo/public;
}
```

![](static/madewpc.gif)
