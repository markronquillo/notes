## Nginx


Proxy passing to our node app

```
root /var/www/html;

index index.html index.html

server_name markjosephronquillo.com www.markjosephronquillo.com;

location / {
    proxy_pass http:127.0.0.1:3001;
}
```

`sudo nginx -t`

`sudo nginx -s reload`

`sudo ufw enable`


#### Why HTTPS

- Security
- Technology
    - Service Workers
    - Web Bluetooth
- HTTP/2

certbot

Go to their site and follow the instruction

```
sudo add-apt-repository ppa:certbot/certbot

sudo pat update

sudo apt install python-certbox-nginx
```

#### Nginx tuning

*gzip*

/etc/nginx/nginx/conf

```
gzip on;
gzip_disable "msie6"
```

```
location /static/ {
    expires 30d;
    proxy_pass http://127.0.0.1:3001/static/;
}
```

##### Caching

/etc/nginx/nginx/sites-available/default

```
proxy_cache_path /tmp/nginx levels=1:2
keys_zone=slowfile_cache:10m inactive=60m
use_temp_path=off;

proxy_cache_key "$request_uri";

server {
    ....

    location /slowfile {
        proxy_cache_valid 1m;
        prox_ignore_headers Cache-Control;
        add_header X-Proxy-Cache $upstream_cache_status;
        proxy_cache slowfile_cache;
        proxy_pass http:/127.0.0.1:3001/slowfile;
    }
}
```