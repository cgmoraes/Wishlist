from falcon_multipart.middleware import MultipartMiddleware
from falcon.media.validators import jsonschema
from wsgiref.simple_server import make_server
import database.wishListDB as db
import falcon
import os

class Resource:
    prod_schema = {
        "title": "Product",
        "type": "object",
        "required": ["title"],
        "properties": {
            "title": {
                "description": "Title of the product",
                "type": "string",
            },
            "description": {
                "description": "Description of the product",
                "type": "string",
            },
            "address": {
                "description": "Address of the product",
                "type": "string",
            },
        },
        "additionalProperties": False,
    }

    def on_get(self, req, resp):
        if req.get_param('random'):
            data = db.wishList.findRandom()
        else:
            data = db.wishList.findAll()
        resp.media = data
        resp.status = falcon.HTTP_200

    @jsonschema.validate(prod_schema)
    def on_post(self, req, resp):
        data = req.media
        db.wishList.insertProduct(data)
        resp.status = falcon.HTTP_201

class ProductResource:

    put_schema = {
        "title": "PUT",
        "type": "object",
        "required": ["bought"],
        "properties": {
            "bought": {
                "description": "Indicates whether the product has already been purchased",
                "type": "string",
            },
        },
        "additionalProperties": False,
    }

    @jsonschema.validate(put_schema)
    def on_put(self, req, resp, product_id):
        data = req.media
        data['product_id'] = product_id
        db.wishList.updateProduct(data)
        resp.status = falcon.HTTP_201
    
    def on_delete(self, req, resp, product_id):
        data = db.wishList.findProduct(product_id)
        filepath = os.path.join('./images', data['image_id'] + '.png')
        if not data['image_id'] == 'default' and os.path.exists(filepath):
            os.remove(filepath)
        db.wishList.deleteProduct(product_id)
        resp.status = falcon.HTTP_200

class ImageResource:

    def _delete_img(self, data):
        filepath = os.path.join('./images', data['image_id'] + '.png')
        if not data['image_id'] == 'default' and os.path.exists(filepath):
            os.remove(filepath)
            return True
        return False

    def _get_path(self, image_id):
        IMAGE_DIR = os.path.join('./images', f'{image_id}.png')
        return IMAGE_DIR

    def on_get(self, req, resp, product_id):
        data = db.wishList.findProduct(product_id)
        filepath = self._get_path(data['image_id'])
        if not os.path.exists(filepath):
            resp.status = falcon.HTTP_404
            return
        
        resp.content_type = 'image/png'
        resp.stream = open(filepath, 'rb')
        resp.content_length = os.path.getsize(filepath)
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp, product_id):
        image = req.get_param('image')
        raw = image.file.read()
        self._delete_img(db.wishList.findProduct(product_id))
        image_id = db.wishList.updateImage(product_id)

        filepath = self._get_path(image_id)
        with open(filepath, 'wb') as f:
            f.write(raw)
        resp.status = falcon.HTTP_201

    def on_delete(self, req, resp, product_id):
        if self._delete_img(db.wishList.findProduct(product_id)):
            db.wishList.deleteImage(product_id)
        resp.status = falcon.HTTP_200

app = falcon.App(cors_enable=True, middleware=[MultipartMiddleware()])

app.add_route('/product', Resource())
app.add_route('/product/{}'.format('{product_id}'), ProductResource())
app.add_route('/product/{}/image'.format('{product_id}'), ImageResource())

if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')
        httpd.serve_forever()
