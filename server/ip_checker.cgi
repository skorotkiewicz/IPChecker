#!/usr/bin/env python3
import os
import json

def application(environ, start_response):
    client_ip = environ.get("REMOTE_ADDR", "Nieznany")
    user_agent = environ.get("HTTP_USER_AGENT", "Nieznany")

    response_body = json.dumps({
        "ip": client_ip,
        "user_agent": user_agent
    })
    
    status = '200 OK'
    response_headers = [
        ('Content-Type', 'application/json'),
        ('Content-Length', str(len(response_body))),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Methods', 'GET, OPTIONS'),
        ('Access-Control-Allow-Headers', 'Content-Type'),
    ]

    start_response(status, response_headers)
    return [response_body.encode('utf-8')]

if __name__ == "__main__":
    from wsgiref.handlers import CGIHandler
    CGIHandler().run(application)