# Wishlist

Aplicação desenvolvida com o propósito de representar uma Wishlist. Em sua implementação foram utilizados: 
 - Framework Falcon para api;
 - Mongodb para o banco de dados;
 - Docker e docker-composer para a conteinerização da aplicação; 
 - Ferramentas de web para facilitar o teste dos endpoints;

## Teste e Deploy

Para poder testar a aplicação é preciso ter o [Docker](https://hub.docker.com/) instalado. Após feito a instalação, no diretório da aplicação execute:

```
docker-compose up
```

Em poucos segundos a aplicação já poderá ser acessada através do [index.html](https://gitlab.com/cgmoraes/wishlist/-/blob/main/index.html)

## Documentações e fontes acessadas para a solução

Durante o desenvolvimento, diversas documentações foram acessadas pois no início não havia conhecimento nas ferramentas utilizadas.

Para o início da implementação:

https://falcon.readthedocs.io/en/stable/user/quickstart.html

https://falcon.readthedocs.io/en/stable/user/tutorial.html


Implementação dos endpoints:

https://falcon.readthedocs.io/en/stable/api/request_and_response_wsgi.html

https://stackoverflow.com/questions/48679165/python-falcon-get-post-data


Código de status http:

https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status


Validação dos jsons:

https://json-schema.org/learn/getting-started-step-by-step

https://json-schema.org/understanding-json-schema/reference/object.html#additional-properties

https://docs.sensedia.com/pt/api-platform-guide/4.3.x.x/interceptors/traffic_json-schema-validation.html

https://falcon.readthedocs.io/en/stable/api/media.html


Post e get de imagens:

https://stackoverflow.com/questions/59689859/how-to-save-an-image-from-post-request-with-falcon-python

https://qiita.com/komakomako/items/5ba6a1b2a582464a7748

https://falcon.readthedocs.io/en/stable/user/tutorial.html#serving-images


Para o docker e Mongodb:

https://hub.docker.com/_/mongo

https://hub.docker.com/_/mongo-express

https://www.w3schools.com/python/python_mongodb_getstarted.asp

https://docs.mongodb.com/upcoming/core/index-unique/

https://dzone.com/articles/python-falcon-microservice-with-mongodb-and-docker


E para o JavaScript da página web:

https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input

https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects

https://qiita.com/komakomako/items/5ba6a1b2a582464a7748

https://www.geeksforgeeks.org/how-to-convert-image-into-base64-string-using-javascript/
